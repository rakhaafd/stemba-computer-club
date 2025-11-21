import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Card, CardContent } from '@components/ui/card';
import { useEffect, useState } from 'react';
import { Link, useForm, usePage} from '@inertiajs/react';


// Import tab components
import AttendanceTab from '@components/tabs/AttendanceTab';
import CompetitionsTab from '@components/tabs/CompetitionsTab';
import InviteCodesTab from '@components/tabs/InviteCodesTab';
import LeaderboardTab from '@components/tabs/LeaderboardTab';
import OverviewTab from '@components/tabs/OverviewTab';
import UsersTab from '@components/tabs/UsersTab';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isVisible, setIsVisible] = useState(false);

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

    // Tambahkan state untuk competitions
    const [competitionsData, setCompetitionsData] = useState([
        {
            id: 1,
            name: 'Annual Programming Challenge',
            type: 'programming',
            startDate: '2024-03-01',
            endDate: '2024-03-15',
            registrationDeadline: '2024-02-25T23:59',
            maxParticipants: 50,
            status: 'published',
            participants: 32,
            description: 'Annual programming competition for all students...',
            prizes: '1st: $1000, 2nd: $500, 3rd: $250',
            links: 'https://example.com/programming-challenge',
            requirements: ['Open to all students', 'Individual participation', 'Basic programming knowledge required'],
            contactPerson: 'John Doe',
            contactEmail: 'john.doe@example.com',
            createdAt: '2024-01-15',
        },
        {
            id: 2,
            name: 'UI/UX Design Hackathon',
            type: 'uiux',
            startDate: '2024-04-10',
            endDate: '2024-04-12',
            registrationDeadline: '2024-04-05T23:59',
            maxParticipants: 30,
            status: 'draft',
            participants: 0,
            description: '48-hour UI/UX design hackathon...',
            prizes: '1st: MacBook Air, 2nd: iPad, 3rd: Design courses',
            links: 'https://example.com/uiux-hackathon',
            requirements: ['Team size: 2-4 members', 'Design tools required', 'Portfolio submission'],
            contactPerson: 'Sarah Smith',
            contactEmail: 'sarah.smith@example.com',
            createdAt: '2024-01-20',
        },
    ]);


    const stats = [
        { number: '127', label: 'Total Members', change: '+12 this month' },
        { number: '89%', label: 'Attendance Rate', change: '+5% from last month' },
        { number: '3', label: 'Active Periods', change: '2025, 2026, 2027' },
        { number: '16', label: 'Weekly Sessions', change: 'This academic year' },
    ];

    const tabs = [
        { id: 'overview', label: 'Overview', shortLabel: 'Overview' },
        { id: 'invite-codes', label: 'Invite Codes', shortLabel: 'Invites' },
        { id: 'attendance', label: 'Attendance', shortLabel: 'Attendance' },
        { id: 'leaderboard', label: 'Leaderboard', shortLabel: 'Leader' },
        { id: 'users', label: 'Users', shortLabel: 'Users' },
        { id: 'competitions', label: 'Competitions', shortLabel: 'Competitions' },
    ];

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
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`min-w-[120px] flex-1 rounded-md px-3 py-2 text-sm font-medium capitalize transition-all duration-200 ${
                                    activeTab === tab.id
                                        ? 'bg-[#EFEEEA] text-[#161616]'
                                        : 'text-[var(--color-secondary)] hover:bg-[#2a2a2a] hover:text-[#EFEEEA]'
                                }`}
                            >
                                <span className="hidden sm:inline">{tab.label}</span>
                                <span className="sm:hidden">{tab.shortLabel}</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Tab Content */}
                <section>
                    {activeTab === 'overview' && (
                        <OverviewTab attendanceData={attendanceData} leaderboardData={leaderboardData} inviteCodes={inviteCodes} />
                    )}

                    {activeTab === 'invite-codes' && <InviteCodesTab inviteCodes={inviteCodes} setInviteCodes={setInviteCodes} />}

                    {activeTab === 'attendance' && <AttendanceTab attendanceData={attendanceData} />}

                    {activeTab === 'leaderboard' && <LeaderboardTab leaderboardData={leaderboardData} />}

                    {activeTab === 'users' && <UsersTab />}

                    {activeTab === 'competitions' && <CompetitionsTab competitions={competitionsData} setCompetitions={setCompetitionsData} />}
                </section>
            </div>
        </div>
    );
};

export default AdminDashboard;
