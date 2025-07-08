import React, { useState } from 'react';
import { User, Settings, LogOut, CreditCard, Activity, Shield, Bell } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Type definitions
interface BaseUser {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
  tokensUsed: number;
  tokensLimit: number;
  createdAt?: Date;
  lastActive?: Date;
}

interface UserProfileProps {
  currentUser: BaseUser;
  onSignOut?: () => void;
  onSettingsClick?: () => void;
  onUpgradeClick?: () => void;
  className?: string;
}

export function UserProfile({ 
  currentUser, 
  onSignOut, 
  onSettingsClick, 
  onUpgradeClick,
  className = ""
}: UserProfileProps) {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Safe avatar access - handles missing avatar property
  const avatarSrc = currentUser?.avatar || '';
  const avatarFallback = currentUser?.name
    ? currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  // Calculate usage percentage
  const usagePercentage = currentUser?.tokensLimit 
    ? Math.min((currentUser.tokensUsed / currentUser.tokensLimit) * 100, 100)
    : 0;

  // Get plan color and label
  const getPlanConfig = (plan: string) => {
    switch (plan) {
      case 'enterprise':
        return { color: 'bg-purple-100 text-purple-800', label: 'Enterprise' };
      case 'pro':
        return { color: 'bg-blue-100 text-blue-800', label: 'Pro' };
      default:
        return { color: 'bg-gray-100 text-gray-800', label: 'Free' };
    }
  };

  const planConfig = getPlanConfig(currentUser?.plan || 'free');

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await onSignOut?.();
    } catch (error) {
      console.error('Sign out failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const formatDate = (date?: Date) => {
    if (!date) return 'Never';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(date));
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className={`h-10 w-10 rounded-full hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 transition-all ${className}`}
          >
            <Avatar className="h-10 w-10">
              <AvatarImage 
                src={avatarSrc} 
                alt={currentUser?.name || 'User avatar'}
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                {avatarFallback}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-80 p-0" align="end" forceMount>
          {/* User Info Header */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage 
                  src={avatarSrc} 
                  alt={currentUser?.name || 'User avatar'}
                  className="object-cover"
                />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                  {avatarFallback}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {currentUser?.name || 'Unknown User'}
                </p>
                <p className="text-sm text-gray-600 truncate">
                  {currentUser?.email || 'No email'}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="secondary" className={planConfig.color}>
                    {planConfig.label}
                  </Badge>
                  {currentUser?.plan === 'free' && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-5 text-xs"
                      onClick={onUpgradeClick}
                    >
                      Upgrade
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Token Usage */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Tokens Used</span>
                <span>
                  {formatNumber(currentUser?.tokensUsed || 0)} / {formatNumber(currentUser?.tokensLimit || 0)}
                </span>
              </div>
              <Progress 
                value={usagePercentage} 
                className={`h-2 ${
                  usagePercentage > 90 
                    ? 'bg-red-500' 
                    : usagePercentage > 70 
                    ? 'bg-yellow-500' 
                    : 'bg-green-500'
                }`}
              />
              <p className="text-xs text-gray-500 mt-1">
                {usagePercentage.toFixed(1)}% used this month
              </p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <DropdownMenuItem
              className="cursor-pointer p-3 rounded-md"
              onClick={() => setShowProfileModal(true)}
            >
              <User className="mr-3 h-4 w-4" />
              <span>View Profile</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer p-3 rounded-md"
              onClick={onSettingsClick}
            >
              <Settings className="mr-3 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer p-3 rounded-md"
              onClick={onUpgradeClick}
            >
              <CreditCard className="mr-3 h-4 w-4" />
              <span>Billing</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer p-3 rounded-md">
              <Activity className="mr-3 h-4 w-4" />
              <span>Usage Analytics</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer p-3 rounded-md">
              <Bell className="mr-3 h-4 w-4" />
              <span>Notifications</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-2" />

            <DropdownMenuItem
              className="cursor-pointer p-3 rounded-md text-red-600 focus:text-red-600 focus:bg-red-50"
              onClick={handleSignOut}
              disabled={isLoading}
            >
              <LogOut className="mr-3 h-4 w-4" />
              <span>{isLoading ? 'Signing out...' : 'Sign Out'}</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Profile Details Modal */}
      <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Profile Details</DialogTitle>
            <DialogDescription>
              Manage your account information and preferences
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            {/* Profile Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage 
                      src={avatarSrc} 
                      alt={currentUser?.name || 'User avatar'}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-lg">
                      {avatarFallback}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{currentUser?.name}</h3>
                    <p className="text-gray-600">{currentUser?.email}</p>
                    <Badge className={`mt-1 ${planConfig.color}`}>
                      {planConfig.label} Plan
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Member since:</span>
                    <span>{formatDate(currentUser?.createdAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last active:</span>
                    <span>{formatDate(currentUser?.lastActive)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">User ID:</span>
                    <span className="font-mono text-xs">#{currentUser?.id}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Usage Stats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Usage Statistics</CardTitle>
                <CardDescription>
                  Current month usage and limits
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>API Tokens Used</span>
                      <span className="font-semibold">
                        {formatNumber(currentUser?.tokensUsed || 0)}
                      </span>
                    </div>
                    <Progress value={usagePercentage} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">
                        {formatNumber(currentUser?.tokensUsed || 0)}
                      </p>
                      <p className="text-xs text-gray-600">Tokens Used</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">
                        {formatNumber(currentUser?.tokensLimit || 0)}
                      </p>
                      <p className="text-xs text-gray-600">Monthly Limit</p>
                    </div>
                  </div>

                  {currentUser?.plan === 'free' && usagePercentage > 80 && (
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 text-yellow-600 mr-2" />
                        <p className="text-sm text-yellow-800">
                          You're approaching your monthly limit. Consider upgrading for unlimited access.
                        </p>
                      </div>
                      <Button
                        size="sm"
                        className="mt-2 bg-yellow-600 hover:bg-yellow-700"
                        onClick={onUpgradeClick}
                      >
                        Upgrade Now
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setShowProfileModal(false)}
            >
              Close
            </Button>
            <Button onClick={onSettingsClick}>
              Edit Profile
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UserProfile;