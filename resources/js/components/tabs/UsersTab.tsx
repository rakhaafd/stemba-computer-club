import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Avatar, AvatarFallback } from '@components/ui/avatar';
import { Input } from '@components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';
import { router } from "@inertiajs/react";
import axios from 'axios';

interface User {
    id: number;
    name: string;
    email: string;
    kelas: string;
    branch: string;
    period: string;
    joinDate: string;
    is_active: 1 | 0;
}

const UsersTab = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 1 | 0>('all');
    const [branchFilter, setBranchFilter] = useState('all');

    useEffect(() => {
        axios.get("/api/admin/users")
            .then(res => {
                console.log("API RESULT:", res.data);
                setUsers(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.kelas.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === 'all' ||
            (statusFilter === 1 && user.is_active === 1) ||
            (statusFilter === 0 && user.is_active === 0);

        const matchesBranch =
            branchFilter === 'all' || user.branch === branchFilter;

        return matchesSearch && matchesStatus && matchesBranch;
    });

    const toggleUserStatus = (id: number) => {
        // Call backend API (dummy PUT for example)
        router.put(`/auth/login/${id}`);
        
        // Update state locally
        const updatedUsers = users.map(user =>
            user.id === id ? { ...user, is_active: user.is_active === 1 ? 0 : 1 } : user
        );
        setUsers(updatedUsers);
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase();
    };

    return (
        <div className="space-y-6">
            <Card className="border-[#2a2a2a] bg-[#1a1a1a]">
                <CardHeader>
                    <CardTitle className="font-primary text-[#EFEEEA]">User Management</CardTitle>
                    <CardDescription className="text-[var(--color-secondary)]">
                        Manage all registered users and their permissions
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Search and Filter */}
                    <div className="mb-6 grid gap-4 md:grid-cols-3">
                        <Input
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border-[#2a2a2a] bg-[#161616] text-[#EFEEEA]"
                        />
                        <Select
                            value={statusFilter}
                            onValueChange={(value) => setStatusFilter(value as 'all' | 1 | 0)}
                        >
                            <SelectTrigger className="border-[#2a2a2a] bg-[#161616] text-[#EFEEEA]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent className="border-[#2a2a2a] bg-[#1a1a1a] text-[#EFEEEA]">
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value={1}>Active</SelectItem>
                                <SelectItem value={0}>Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={branchFilter} onValueChange={setBranchFilter}>
                            <SelectTrigger className="border-[#2a2a2a] bg-[#161616] text-[#EFEEEA]">
                                <SelectValue placeholder="Filter by branch" />
                            </SelectTrigger>
                            <SelectContent className="border-[#2a2a2a] bg-[#1a1a1a] text-[#EFEEEA]">
                                <SelectItem value="all">All Branches</SelectItem>
                                <SelectItem value="Programming">Programming</SelectItem>
                                <SelectItem value="UI/UX">UI/UX</SelectItem>
                                <SelectItem value="Cyber Security">Cyber Security</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Users Table */}
                    <Table>
                        <TableHeader>
                            <TableRow className="border-[#2a2a2a]">
                                <TableHead className="text-white">User</TableHead>
                                <TableHead className="text-white">Class</TableHead>
                                <TableHead className="text-white">Branch</TableHead>
                                <TableHead className="text-white">Period</TableHead>
                                <TableHead className="text-white">Join Date</TableHead>
                                <TableHead className="text-white">Status</TableHead>
                                <TableHead className="text-white">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center text-[var(--color-secondary)] py-8">
                                        No users found matching your criteria
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredUsers.map(user => (
                                    <TableRow key={user.id} className="border-[#2a2a2a]">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback className="bg-[#EFEEEA] font-primary text-[#161616]">
                                                        {getInitials(user.name)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium text-[#EFEEEA]">{user.name}</div>
                                                    <div className="text-sm text-[var(--color-secondary)]">{user.email}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-[var(--color-secondary)]">{user.kelas}</TableCell>
                                        <TableCell className="text-[var(--color-secondary)]">{user.branch}</TableCell>
                                        <TableCell className="text-[var(--color-secondary)]">{user.period}</TableCell>
                                        <TableCell className="text-[var(--color-secondary)]">{user.joinDate}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="secondary"
                                                className={
                                                    user.is_active === 1
                                                        ? 'border-green-500/30 bg-green-500/20 text-green-400'
                                                        : 'border-red-500/30 bg-red-500/20 text-red-400'
                                                }
                                            >
                                                {user.is_active === 1 ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-[var(--color-secondary)] text-[#EFEEEA] hover:bg-[var(--color-secondary)]/10"
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => toggleUserStatus(user.id)}
                                                    className={
                                                        user.is_active === 0
                                                            ? 'border-red-500/30 text-red-400 hover:bg-red-500/20'
                                                            : 'border-green-500/30 text-green-400 hover:bg-green-500/20'
                                                    }
                                                >
                                                    {user.is_active === 1 ? 'Active' : 'Deactivate'}
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>

                    {/* Summary Stats */}
                    <div className="mt-6 flex flex-wrap gap-4 text-sm text-[var(--color-secondary)]">
                        <div>Total Users: <span className="text-[#EFEEEA]">{filteredUsers.length}</span></div>
                        <div>Active: <span className="text-green-400">{filteredUsers.filter(u => u.is_active === 1).length}</span></div>
                        <div>Inactive: <span className="text-red-400">{filteredUsers.filter(u => u.is_active === 0).length}</span></div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default UsersTab;
