import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  Menu,
  Search,
  Grid,
  Settings,
  FolderKanban,
  Bell,
  Globe,
  User,
  LogOut,
  ChevronDown,
  SlidersHorizontal
} from 'lucide-react';

interface TopHeaderProps {
  className?: string;
  onSidebarToggle?: () => void;
}

const TopHeader: React.FC<TopHeaderProps> = ({ className, onSidebarToggle }) => {
  return (
    <header className={cn('fixed top-0 left-0 right-0 z-40 h-16 bg-card border-b border-border flex items-center px-4 sm:px-6', className)}>
      <div className="flex items-center">
        {onSidebarToggle && (
            <Button variant="ghost" size="icon" onClick={onSidebarToggle} className="mr-2 lg:hidden">
                <Menu className="h-5 w-5" />
            </Button>
        )}
        {/* Architect logo for smaller screens or if sidebar is hidden by default */}
        {/* <a href="#" className="text-xl font-bold text-primary mr-4 lg:hidden">Architect</a> */}
        
        {/* Search Bar - shown on larger screens, might be a toggle on smaller */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="pl-8 sm:w-[200px] md:w-[250px] lg:w-[300px] h-9 rounded-md bg-background" />
        </div>
      </div>

      <div className="flex items-center ml-auto space-x-2 sm:space-x-3">
        {/* Mega Menu, Settings, Projects - example actions */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="hidden md:flex items-center text-sm px-2 sm:px-3 h-9">
              <Grid className="h-4 w-4 mr-1 sm:mr-2" />
              Mega Menu
              <ChevronDown className="h-4 w-4 ml-1 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Link 1</DropdownMenuItem>
            <DropdownMenuItem>Link 2</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Another Action</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" className="hidden md:flex items-center text-sm px-2 sm:px-3 h-9">
          <Settings className="h-4 w-4 mr-1 sm:mr-2" />
          Settings
        </Button>

        <Button variant="ghost" className="hidden md:flex items-center text-sm px-2 sm:px-3 h-9">
          <FolderKanban className="h-4 w-4 mr-1 sm:mr-2" />
          Projects
        </Button>

        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Globe className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>Deutsch</DropdownMenuItem>
            <DropdownMenuItem>Español</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-9 w-9">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 min-w-0 p-0 flex items-center justify-center text-xs rounded-full bg-destructive text-destructive-foreground">3</Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>New message from John</DropdownMenuItem>
            <DropdownMenuItem>Update available</DropdownMenuItem>
            <DropdownMenuItem>Server status: OK</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 px-2 h-9">
              <Avatar className="h-7 w-7">
                <AvatarImage src="https://i.pravatar.cc/40?u=alina" alt="Alina Mclourd" />
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
              <div className="hidden lg:flex flex-col items-start">
                <span className="text-xs font-medium">Alina Mclourd</span>
                <span className="text-xs text-muted-foreground">VP People Manager</span>
              </div>
               <ChevronDown className="h-4 w-4 opacity-50 hidden lg:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              <span>Preferences</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
