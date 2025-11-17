import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Input } from '@components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table';
import { useEffect, useState } from 'react';
import { Link, useForm} from '@inertiajs/react';


const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isVisible, setIsVisible] = useState(false);

    const {
    data: regCodeData,
    setData: setRegCodeData,
    post: regCodePost,
    processing: regCodeProcessing,
    errors: regCodeErrors
    } = useForm({
    code: "",
    generation_year: "",
    usage_total: "",
    });

// const {
//     data: compData,
//     setData: setCompData,
//     post: compPost,
//     processing: compProcessing,
//     errors: compErrors
//     } = useForm({
//     name: "",
//     description: "",
//     date: "",
//     });


    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Mock data - replace with actual API calls
    const [inviteCodes, setInviteCodes] = useState([
        { id: 1, code: 'STEMBA2027', period: '2027', createdAt: '2024-01-15', uses: 45, maxUses: 100, isActive: true },
        { id: 2, code: 'STEMBA2026', period: '2026', createdAt: '2024-01-10', uses: 32, maxUses: 80, isActive: true },
        { id: 3, code: 'ALUMNI2025', period: '2025', createdAt: '2023-12-20', uses: 80, maxUses: 80, isActive: false },
    ]);

    const [attendanceData, setAttendanceData] = useState([
        { id: 1, name: 'John Doe', class: '12A', email: 'john@email.com', branch: 'Programming', date: '2024-01-15', status: 'Present' },
        { id: 2, name: 'Sarah Smith', class: '11B', email: 'sarah@email.com', branch: 'UI/UX', date: '2024-01-15', status: 'Present' },
        { id: 3, name: 'Mike Johnson', class: '12C', email: 'mike@email.com', branch: 'Cyber Security', date: '2024-01-15', status: 'Absent' },
    ]);

    const [leaderboardData, setLeaderboardData] = useState([
        { rank: 1, name: 'Emma Wilson', class: '12A', branch: 'Programming', attendance: 15, total: 16 },
        { rank: 2, name: 'Alex Chen', class: '11B', branch: 'UI/UX', attendance: 14, total: 16 },
        { rank: 3, name: 'David Kim', class: '12C', branch: 'Cyber Security', attendance: 14, total: 16 },
        { rank: 4, name: 'Lisa Park', class: '11A', branch: 'Programming', attendance: 13, total: 16 },
    ]);

    const [newCode, setNewCode] = useState({
        code: '',
        period: '',
        maxUses: 50,
    });

    const stats = [
        { number: '127', label: 'Total Members', change: '+12 this month' },
        { number: '89%', label: 'Attendance Rate', change: '+5% from last month' },
        { number: '3', label: 'Active Periods', change: '2025, 2026, 2027' },
        { number: '16', label: 'Weekly Sessions', change: 'This academic year' },
    ];

    const generateInviteCode = (e: React.FormEvent) => {
        e.preventDefault();
        const code = `STEMBA${newCode.period || '2027'}`;
        regCodePost("/auth/admin/code"); // Inertia POST route
        setInviteCodes([
            ...inviteCodes,
            {
                id: inviteCodes.length + 1,
                code,
                period: newCode.period || '2027',
                createdAt: new Date().toISOString().split('T')[0],
                uses: 0,
                maxUses: newCode.maxUses,
                isActive: true,
            },
        ]);
        setNewCode({ code: '', period: '', maxUses: 50 });
    };

    const toggleCodeStatus = (id: number) => {
        setInviteCodes(inviteCodes.map((code) => (code.id === id ? { ...code, isActive: !code.isActive } : code)));
    };

    return (
        <div className="min-h-screen overflow-hidden bg-[#161616] text-[#EFEEEA]">
            {/* Navigation */}
            <nav className="fixed top-0 z-50 w-full border-b border-[#2a2a2a] bg-[#161616]/90 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFEEEA]">
                                <span className="font-primary text-lg font-bold text-[#161616]">SCC</span>
                            </div>
                            <span className="font-primary text-xl font-bold">Admin Dashboard</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/avatars/admin.jpg" />
                                <AvatarFallback className="bg-[#EFEEEA] font-primary text-[#161616]">AD</AvatarFallback>
                            </Avatar>
                            <Link 
                            variant="outline" 
                            className="border-[var(--color-secondary)] text-[#EFEEEA] hover:bg-[var(--color-secondary)]/10"
                            href="/auth/admin/logout"
                            method="post"
                            as="button"
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-6 py-8 pt-25">
                {/* Stats Overview */}
                <section className="mb-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat, index) => (
                            <Card
                                key={index}
                                className="border-[#2a2a2a] bg-[#1a1a1a] transition-all duration-300 hover:border-[var(--color-secondary)]"
                            >
                                <CardContent className="p-6">
                                    <div className="mb-2 font-primary text-3xl font-bold text-[#EFEEEA]">{stat.number}</div>
                                    <div className="mb-1 font-medium text-[#EFEEEA]">{stat.label}</div>
                                    <div className="text-sm text-[var(--color-secondary)]">{stat.change}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Navigation Tabs */}
                <section className="mb-8">
                    <div className="flex flex-wrap gap-1 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-1">
                        {['overview', 'invite-codes', 'attendance', 'leaderboard', 'users', 'competitions'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`min-w-[120px] flex-1 rounded-md px-3 py-2 text-sm font-medium capitalize transition-all duration-200 ${
                                    activeTab === tab
                                        ? 'bg-[#EFEEEA] text-[#161616]'
                                        : 'text-[var(--color-secondary)] hover:bg-[#2a2a2a] hover:text-[#EFEEEA]'
                                }`}
                            >
                                <span className="hidden sm:inline">{tab.replace('-', ' ')}</span>
                                <span className="sm:hidden">
                                    {tab === 'overview'
                                        ? 'Overview'
                                        : tab === 'invite-codes'
                                          ? 'Invites'
                                          : tab === 'attendance'
                                            ? 'Attendance'
                                            : tab === 'leaderboard'
                                              ? 'Leader'
                                              : tab === 'users'
                                                ? 'Users'
                                                : tab === 'competitions'
                                                  ? 'Competitions'
                                                  : tab}
                                </span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Tab Content */}
                <section>
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            <Card className="border-[#2a2a2a] bg-[#1a1a1a]">
                                <CardHeader>
                                    <CardTitle className="font-primary text-[#EFEEEA]">Recent Activity</CardTitle>
                                    <CardDescription className="text-[var(--color-secondary)]">
                                        Latest registrations and attendance records
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="border-[#2a2a2a]">
                                                <TableHead className="text-white">Name</TableHead>
                                                <TableHead className="text-white">Class</TableHead>
                                                <TableHead className="text-white">Branch</TableHead>
                                                <TableHead className="text-white">Date</TableHead>
                                                <TableHead className="text-white">Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {attendanceData.slice(0, 5).map((record) => (
                                                <TableRow key={record.id} className="border-[#2a2a2a]">
                                                    <TableCell className="text-[#EFEEEA]">{record.name}</TableCell>
                                                    <TableCell className="text-[var(--color-secondary)]">{record.class}</TableCell>
                                                    <TableCell className="text-[var(--color-secondary)]">{record.branch}</TableCell>
                                                    <TableCell className="text-[var(--color-secondary)]">{record.date}</TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant="secondary"
                                                            className={
                                                                record.status === 'Present'
                                                                    ? 'border-green-500/30 bg-green-500/20 text-green-400'
                                                                    : 'border-red-500/30 bg-red-500/20 text-red-400'
                                                            }
                                                        >
                                                            {record.status}
                                                        </Badge>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>

                            <div className="grid gap-6 md:grid-cols-2">
                                <Card className="border-[#2a2a2a] bg-[#1a1a1a]">
                                    <CardHeader>
                                        <CardTitle className="font-primary text-[#EFEEEA]">Top Performers</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {leaderboardData.slice(0, 3).map((student) => (
                                            <div
                                                key={student.rank}
                                                className="flex items-center justify-between border-b border-[#2a2a2a] py-3 last:border-0"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EFEEEA] text-sm font-bold text-[#161616]">
                                                        {student.rank}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-[#EFEEEA]">{student.name}</div>
                                                        <div className="text-sm text-[var(--color-secondary)]">
                                                            {student.class} • {student.branch}
                                                        </div>
                                                    </div>
                                                </div>
                                                <Badge variant="secondary" className="bg-[#EFEEEA] text-[#161616]">
                                                    {student.attendance}/{student.total}
                                                </Badge>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>

                                <Card className="border-[#2a2a2a] bg-[#1a1a1a]">
                                    <CardHeader>
                                        <CardTitle className="font-primary text-[#EFEEEA]">Active Invite Codes</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {inviteCodes
                                            .filter((code) => code.isActive)
                                            .map((code) => (
                                                <div
                                                    key={code.id}
                                                    className="flex items-center justify-between border-b border-[#2a2a2a] py-3 last:border-0"
                                                >
                                                    <div>
                                                        <div className="font-medium text-[#EFEEEA]">{code.code}</div>
                                                        <div className="text-sm text-[var(--color-secondary)]">Period: {code.period}</div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-[#EFEEEA]">
                                                            {code.uses}/{code.maxUses}
                                                        </div>
                                                        <div className="text-sm text-[var(--color-secondary)]">uses</div>
                                                    </div>
                                                </div>
                                            ))}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}

                    {/* Invite Codes Tab */}
                    {activeTab === 'invite-codes' && (
                        <div className="space-y-6">
                            <Card className="border-[#2a2a2a] bg-[#1a1a1a]">
                                <CardHeader>
                                    <CardTitle className="font-primary text-[#EFEEEA]">Generate New Invite Code</CardTitle>
                                    <CardDescription className="text-[var(--color-secondary)]">
                                        Create unique invite codes for different student periods
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form
                                    onSubmit={generateInviteCode} 
                                    className="mb-4 grid gap-4 md:grid-cols-3"
                                    >
                                        <Input
                                            placeholder="Period (e.g., 2027)"
                                            value={newCode.period}
                                            onChange={(e) => setNewCode({ ...newCode, period: e.target.value })}
                                            className="border-[#2a2a2a] bg-[#161616] text-[#EFEEEA]"
                                        />
                                        <Input
                                            type="number"
                                            placeholder="Max Uses"
                                            value={newCode.maxUses}
                                            onChange={(e) => setNewCode({ ...newCode, maxUses: parseInt(e.target.value) || 50 })}
                                            className="border-[#2a2a2a] bg-[#161616] text-[#EFEEEA]"
                                        />
                                        <Button type='submit' disabled={regCodeProcessing} className="bg-[#EFEEEA] text-[#161616] hover:bg-[#e0ded9]">
                                            Generate Code
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>

                            <Card className="border-[#2a2a2a] bg-[#1a1a1a]">
                                <CardHeader>
                                    <CardTitle className="font-primary text-[#EFEEEA]">Active Invite Codes</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="border-[#2a2a2a]">
                                                <TableHead className="font-medium text-white">Code</TableHead>
                                                <TableHead className="font-medium text-white">Period</TableHead>
                                                <TableHead className="font-medium text-white">Created</TableHead>
                                                <TableHead className="font-medium text-white">Usage</TableHead>
                                                <TableHead className="font-medium text-white">Status</TableHead>
                                                <TableHead className="font-medium text-white">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {inviteCodes.map((code) => (
                                                <TableRow key={code.id} className="border-[#2a2a2a]">
                                                    <TableCell className="font-mono text-[#EFEEEA]">{code.code}</TableCell>
                                                    <TableCell className="text-[var(--color-secondary)]">{code.period}</TableCell>
                                                    <TableCell className="text-[var(--color-secondary)]">{code.createdAt}</TableCell>
                                                    <TableCell className="text-[var(--color-secondary)]">
                                                        {code.uses}/{code.maxUses}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant="secondary"
                                                            className={
                                                                code.isActive
                                                                    ? 'border-green-500/30 bg-green-500/20 text-green-400'
                                                                    : 'border-red-500/30 bg-red-500/20 text-red-400'
                                                            }
                                                        >
                                                            {code.isActive ? 'Active' : 'Inactive'}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => toggleCodeStatus(code.id)}
                                                            className="border-[var(--color-secondary)] text-[#EFEEEA] hover:bg-[var(--color-secondary)]/10"
                                                        >
                                                            {code.isActive ? 'Deactivate' : 'Activate'}
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Attendance Tab */}
                    {activeTab === 'attendance' && (
                        <Card className="border-[#2a2a2a] bg-[#1a1a1a]">
                            <CardHeader>
                                <CardTitle className="font-primary text-[#EFEEEA]">Attendance Records</CardTitle>
                                <CardDescription className="text-[var(--color-secondary)]">Weekly class attendance tracking</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-6 flex gap-4">
                                    <Select defaultValue="all">
                                        <SelectTrigger className="w-32 border-[#2a2a2a] bg-[#161616] text-[#EFEEEA]">
                                            <SelectValue placeholder="Branch" />
                                        </SelectTrigger>
                                        <SelectContent className="border-[#2a2a2a] bg-[#1a1a1a] text-[#EFEEEA]">
                                            <SelectItem value="all">All Branches</SelectItem>
                                            <SelectItem value="programming">Programming</SelectItem>
                                            <SelectItem value="uiux">UI/UX</SelectItem>
                                            <SelectItem value="cybersecurity">Cyber Security</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Input type="date" className="w-40 border-[#2a2a2a] bg-[#161616] text-[#EFEEEA]" defaultValue="2024-01-15" />
                                </div>
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-[#2a2a2a]">
                                            <TableHead className="text-white">Name</TableHead>
                                            <TableHead className="text-white">Class</TableHead>
                                            <TableHead className="text-white">Email</TableHead>
                                            <TableHead className="text-white">Branch</TableHead>
                                            <TableHead className="text-white">Date</TableHead>
                                            <TableHead className="text-white">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {attendanceData.map((record) => (
                                            <TableRow key={record.id} className="border-[#2a2a2a]">
                                                <TableCell className="text-[#EFEEEA]">{record.name}</TableCell>
                                                <TableCell className="text-[var(--color-secondary)]">{record.class}</TableCell>
                                                <TableCell className="text-[var(--color-secondary)]">{record.email}</TableCell>
                                                <TableCell className="text-[var(--color-secondary)]">{record.branch}</TableCell>
                                                <TableCell className="text-[var(--color-secondary)]">{record.date}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="secondary"
                                                        className={
                                                            record.status === 'Present'
                                                                ? 'border-green-500/30 bg-green-500/20 text-green-400'
                                                                : 'border-red-500/30 bg-red-500/20 text-red-400'
                                                        }
                                                    >
                                                        {record.status}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    )}

                    {/* Leaderboard Tab */}
                    {activeTab === 'leaderboard' && (
                        <div className="space-y-6">
                            <Card className="border-[#2a2a2a] bg-[#1a1a1a]">
                                <CardHeader>
                                    <CardTitle className="font-primary text-[#EFEEEA]">Student Leaderboard</CardTitle>
                                    <CardDescription className="text-[var(--color-secondary)]">
                                        Track attendance performance across different branches and years
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="mb-6 flex gap-4">
                                        <Select defaultValue="2024">
                                            <SelectTrigger className="w-32 border-[#2a2a2a] bg-[#161616] text-[#EFEEEA]">
                                                <SelectValue placeholder="Year" />
                                            </SelectTrigger>
                                            <SelectContent className="border-[#2a2a2a] bg-[#1a1a1a] text-[#EFEEEA]">
                                                <SelectItem value="2024">2024</SelectItem>
                                                <SelectItem value="2023">2023</SelectItem>
                                                <SelectItem value="2022">2022</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Select defaultValue="all">
                                            <SelectTrigger className="w-40 border-[#2a2a2a] bg-[#161616] text-[#EFEEEA]">
                                                <SelectValue placeholder="Branch" />
                                            </SelectTrigger>
                                            <SelectContent className="border-[#2a2a2a] bg-[#1a1a1a] text-[#EFEEEA]">
                                                <SelectItem value="all">All Branches</SelectItem>
                                                <SelectItem value="programming">Programming</SelectItem>
                                                <SelectItem value="uiux">UI/UX</SelectItem>
                                                <SelectItem value="cybersecurity">Cyber Security</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-4">
                                        {leaderboardData.map((student) => (
                                            <Card
                                                key={student.rank}
                                                className="border-[#2a2a2a] bg-[#161616] transition-all duration-300 hover:border-[var(--color-secondary)]"
                                            >
                                                <CardContent className="p-6">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-4">
                                                            <div
                                                                className={`flex h-12 w-12 items-center justify-center rounded-full font-primary text-lg font-bold ${
                                                                    student.rank === 1
                                                                        ? 'border border-yellow-500/30 bg-yellow-500/20 text-yellow-400'
                                                                        : student.rank === 2
                                                                          ? 'border border-gray-400/30 bg-gray-400/20 text-gray-300'
                                                                          : student.rank === 3
                                                                            ? 'border border-orange-500/30 bg-orange-500/20 text-orange-400'
                                                                            : 'border border-[#2a2a2a] bg-[#2a2a2a] text-[#EFEEEA]'
                                                                }`}
                                                            >
                                                                {student.rank}
                                                            </div>
                                                            <div>
                                                                <div className="font-primary text-lg font-bold text-[#EFEEEA]">{student.name}</div>
                                                                <div className="text-[var(--color-secondary)]">
                                                                    {student.class} • {student.branch}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="font-primary text-2xl font-bold text-[#EFEEEA]">
                                                                {student.attendance}
                                                                <span className="text-lg text-[var(--color-secondary)]">/{student.total}</span>
                                                            </div>
                                                            <div className="text-[var(--color-secondary)]">sessions</div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 h-2 w-full rounded-full bg-[#2a2a2a]">
                                                        <div
                                                            className="h-2 rounded-full bg-[var(--color-secondary)] transition-all duration-500"
                                                            style={{ width: `${(student.attendance / student.total) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Users Tab */}
                    {activeTab === 'users' && (
                        <Card className="border-[#2a2a2a] bg-[#1a1a1a]">
                            <CardHeader>
                                <CardTitle className="font-primary text-[#EFEEEA]">User Management</CardTitle>
                                <CardDescription className="text-[var(--color-secondary)]">
                                    Manage all registered users and their permissions
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
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
                                        {[
                                            {
                                                id: 1,
                                                name: 'John Doe',
                                                class: '12A',
                                                branch: 'Programming',
                                                period: '2024',
                                                joinDate: '2024-01-10',
                                                status: 'Active',
                                            },
                                            {
                                                id: 2,
                                                name: 'Sarah Smith',
                                                class: '11B',
                                                branch: 'UI/UX',
                                                period: '2024',
                                                joinDate: '2024-01-12',
                                                status: 'Active',
                                            },
                                            {
                                                id: 3,
                                                name: 'Mike Johnson',
                                                class: '12C',
                                                branch: 'Cyber Security',
                                                period: '2024',
                                                joinDate: '2024-01-08',
                                                status: 'Inactive',
                                            },
                                        ].map((user) => (
                                            <TableRow key={user.id} className="border-[#2a2a2a]">
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarFallback className="bg-[#EFEEEA] font-primary text-[#161616]">
                                                                {user.name
                                                                    .split(' ')
                                                                    .map((n) => n[0])
                                                                    .join('')}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="font-medium text-[#EFEEEA]">{user.name}</div>
                                                            <div className="text-sm text-[var(--color-secondary)]">user@email.com</div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-[var(--color-secondary)]">{user.class}</TableCell>
                                                <TableCell className="text-[var(--color-secondary)]">{user.branch}</TableCell>
                                                <TableCell className="text-[var(--color-secondary)]">{user.period}</TableCell>
                                                <TableCell className="text-[var(--color-secondary)]">{user.joinDate}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="secondary"
                                                        className={
                                                            user.status === 'Active'
                                                                ? 'border-green-500/30 bg-green-500/20 text-green-400'
                                                                : 'border-red-500/30 bg-red-500/20 text-red-400'
                                                        }
                                                    >
                                                        {user.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="border-[var(--color-secondary)] text-[#EFEEEA] hover:bg-[var(--color-secondary)]/10"
                                                    >
                                                        Edit
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === 'competitions' && (
                        <div className="space-y-6">
                            {/* Header Section */}
                            <Card className="border-[#2a2a2a] bg-[#1a1a1a]">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="font-primary text-[#EFEEEA]">Competition Management</CardTitle>
                                            <CardDescription className="text-[var(--color-secondary)]">
                                                Add and manage competition information
                                            </CardDescription>
                                        </div>
                                        <Button className="bg-[var(--color-secondary)] text-[#161616] hover:bg-[var(--color-secondary)]/90">
                                            Add Competition
                                        </Button>
                                    </div>
                                </CardHeader>
                            </Card>

                            {/* Add Competition Form */}
                            <Card className="border-[#2a2a2a] bg-[#1a1a1a]">
                                <CardHeader>
                                    <CardTitle className="font-primary text-[#EFEEEA]">Add New Competition</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6 md:grid-cols-2">
                                        {/* Competition Name */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-[#EFEEEA]">Competition Name *</label>
                                            <Input
                                                placeholder="Enter competition name"
                                                className="border-[#2a2a2a] bg-[#161616] text-[#EFEEEA] placeholder:text-[var(--color-secondary)]"
                                            />
                                        </div>

                                        {/* Competition Type */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-[#EFEEEA]">Competition Type *</label>
                                            <Select>
                                                <SelectTrigger className="border-[#2a2a2a] bg-[#161616] text-[#EFEEEA]">
                                                    <SelectValue placeholder="Select competition type" />
                                                </SelectTrigger>
                                                <SelectContent className="border-[#2a2a2a] bg-[#1a1a1a] text-[#EFEEEA]">
                                                    <SelectItem value="programming">Programming</SelectItem>
                                                    <SelectItem value="uiux">UI/UX Design</SelectItem>
                                                    <SelectItem value="cybersecurity">Cyber Security</SelectItem>
                                                    <SelectItem value="robotics">Robotics</SelectItem>
                                                    <SelectItem value="data-science">Data Science</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Start Date */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-[#EFEEEA]">Start Date *</label>
                                            <Input type="date" className="border-[#2a2a2a] bg-[#161616] text-[#EFEEEA]" />
                                        </div>

                                        {/* End Date */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-[#EFEEEA]">End Date *</label>
                                            <Input type="date" className="border-[#2a2a2a] bg-[#161616] text-[#EFEEEA]" />
                                        </div>

                                        {/* Registration Deadline */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-[#EFEEEA]">Registration Deadline</label>
                                            <Input type="datetime-local" className="border-[#2a2a2a] bg-[#161616] text-[#EFEEEA]" />
                                        </div>

                                        {/* Maximum Participants */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-[#EFEEEA]">Max Participants</label>
                                            <Input
                                                type="number"
                                                placeholder="0 for unlimited"
                                                className="border-[#2a2a2a] bg-[#161616] text-[#EFEEEA]"
                                            />
                                        </div>

                                        {/* Description */}
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-medium text-[#EFEEEA]">Description *</label>
                                            <textarea
                                                placeholder="Enter competition description, rules, and requirements..."
                                                rows={4}
                                                className="w-full rounded-md border border-[#2a2a2a] bg-[#161616] px-3 py-2 text-[#EFEEEA] placeholder:text-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-secondary)] focus:outline-none"
                                            />
                                        </div>

                                        {/* Prize Information */}
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-medium text-[#EFEEEA]">Prize Information</label>
                                            <textarea
                                                placeholder="List prizes for winners..."
                                                rows={3}
                                                className="w-full rounded-md border border-[#2a2a2a] bg-[#161616] px-3 py-2 text-[#EFEEEA] placeholder:text-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-secondary)] focus:outline-none"
                                            />
                                        </div>

                                        {/* Link Information */}
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-medium text-[#EFEEEA]">Link Information</label>
                                            <textarea
                                                placeholder="Link competition...."
                                                rows={3}
                                                className="w-full rounded-md border border-[#2a2a2a] bg-[#161616] px-3 py-2 text-[#EFEEEA] placeholder:text-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-secondary)] focus:outline-none"
                                            />
                                        </div>

                                        {/* Eligibility Requirements */}
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-medium text-[#EFEEEA]">Eligibility Requirements</label>
                                            <div className="space-y-2">
                                                {[
                                                    'Open to all students',
                                                    'Minimum GPA 3.0',
                                                    'Team size: 1-4 members',
                                                    'Must have basic programming knowledge',
                                                ].map((req, index) => (
                                                    <div key={index} className="flex items-center space-x-2">
                                                        <Input defaultValue={req} className="border-[#2a2a2a] bg-[#161616] text-[#EFEEEA]" />
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="border-red-500/30 text-red-400 hover:bg-red-500/20"
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                ))}
                                                <Button
                                                    variant="outline"
                                                    className="border-[#2a2a2a] text-[var(--color-secondary)] hover:bg-[#2a2a2a]"
                                                >
                                                    Add Requirement
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Contact Information */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-[#EFEEEA]">Contact Person</label>
                                            <Input placeholder="Contact person name" className="border-[#2a2a2a] bg-[#161616] text-[#EFEEEA]" />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-[#EFEEEA]">Contact Email</label>
                                            <Input
                                                type="email"
                                                placeholder="contact@example.com"
                                                className="border-[#2a2a2a] bg-[#161616] text-[#EFEEEA]"
                                            />
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-6 flex gap-3">
                                        <Button className="bg-[var(--color-secondary)] text-[#161616] hover:bg-[var(--color-secondary)]/90">
                                            Save Competition
                                        </Button>
                                        <Button variant="outline" className="border-[#2a2a2a] text-[#EFEEEA] hover:bg-[#2a2a2a]">
                                            Cancel
                                        </Button>
                                        <Button variant="outline" className="border-[#2a2a2a] text-[#EFEEEA] hover:bg-[#2a2a2a]">
                                            Save as Draft
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Existing Competitions List */}
                            <Card className="border-[#2a2a2a] bg-[#1a1a1a]">
                                <CardHeader>
                                    <CardTitle className="font-primary text-[#EFEEEA]">Existing Competitions</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {[].length === 0 ? (
                                            <div className="py-8 text-center text-[var(--color-secondary)]">
                                                <p>No competitions added yet</p>
                                                <p className="text-sm">Start by adding your first competition above</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">{/* Competition cards would be listed here */}</div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default AdminDashboard;
