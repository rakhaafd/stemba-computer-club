import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { ChevronDown, ChevronLeft, ChevronRight, Crown, Filter, Medal, Star, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';

const Leaderboard = () => {
    const [selectedYear, setSelectedYear] = useState<string>('2024');
    const [selectedField, setSelectedField] = useState<string>('all');
    const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isYearOpen, setIsYearOpen] = useState(false);
    const [isFieldOpen, setIsFieldOpen] = useState(false);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Data dummy untuk leaderboard (50 data untuk testing pagination)
    const mockLeaderboardData = [
        {
            id: 1,
            name: 'Alex Chen',
            avatar: '/avatars/alex.jpg',
            initial: 'AC',
            field: 'programming',
            attendance: 95,
            rank: 1,
            projects: 8,
            joinedYear: 2023,
        },
        {
            id: 2,
            name: 'Sarah Kim',
            avatar: '/avatars/sarah.jpg',
            initial: 'SK',
            field: 'cyber-security',
            attendance: 92,
            rank: 2,
            projects: 7,
            joinedYear: 2023,
        },
        {
            id: 3,
            name: 'Mike Rodriguez',
            avatar: '/avatars/mike.jpg',
            initial: 'MR',
            field: 'ui-ux',
            attendance: 88,
            rank: 3,
            projects: 6,
            joinedYear: 2024,
        },
        {
            id: 4,
            name: 'Emily Wang',
            avatar: '/avatars/emily.jpg',
            initial: 'EW',
            field: 'programming',
            attendance: 85,
            rank: 4,
            projects: 5,
            joinedYear: 2023,
        },
        {
            id: 5,
            name: 'James Wilson',
            avatar: '/avatars/james.jpg',
            initial: 'JW',
            field: 'cyber-security',
            attendance: 82,
            rank: 5,
            projects: 4,
            joinedYear: 2024,
        },
        {
            id: 6,
            name: 'Lisa Park',
            avatar: '/avatars/lisa.jpg',
            initial: 'LP',
            field: 'ui-ux',
            attendance: 80,
            rank: 6,
            projects: 5,
            joinedYear: 2023,
        },
        {
            id: 7,
            name: 'David Kumar',
            avatar: '/avatars/david.jpg',
            initial: 'DK',
            field: 'programming',
            attendance: 78,
            rank: 7,
            projects: 4,
            joinedYear: 2024,
        },
        {
            id: 8,
            name: 'Maria Gonzalez',
            avatar: '/avatars/maria.jpg',
            initial: 'MG',
            field: 'cyber-security',
            attendance: 75,
            rank: 8,
            projects: 3,
            joinedYear: 2023,
        },
        {
            id: 9,
            name: 'Tom Hanks',
            avatar: '/avatars/tom.jpg',
            initial: 'TH',
            field: 'ui-ux',
            attendance: 72,
            rank: 9,
            projects: 3,
            joinedYear: 2024,
        },
        {
            id: 10,
            name: 'Anna Lee',
            avatar: '/avatars/anna.jpg',
            initial: 'AL',
            field: 'programming',
            attendance: 70,
            rank: 10,
            projects: 2,
            joinedYear: 2024,
        },
        // Data tambahan untuk testing pagination
        {
            id: 11,
            name: 'Ryan Park',
            avatar: '/avatars/ryan.jpg',
            initial: 'RP',
            field: 'cyber-security',
            attendance: 68,
            rank: 11,
            projects: 2,
            joinedYear: 2023,
        },
        {
            id: 12,
            name: 'Sophia Martinez',
            avatar: '/avatars/sophia.jpg',
            initial: 'SM',
            field: 'ui-ux',
            attendance: 65,
            rank: 12,
            projects: 2,
            joinedYear: 2024,
        },
        {
            id: 13,
            name: 'Daniel Brown',
            avatar: '/avatars/daniel.jpg',
            initial: 'DB',
            field: 'programming',
            attendance: 62,
            rank: 13,
            projects: 1,
            joinedYear: 2024,
        },
        {
            id: 14,
            name: 'Olivia Taylor',
            avatar: '/avatars/olivia.jpg',
            initial: 'OT',
            field: 'cyber-security',
            attendance: 60,
            rank: 14,
            projects: 1,
            joinedYear: 2023,
        },
        {
            id: 15,
            name: 'Kevin Johnson',
            avatar: '/avatars/kevin.jpg',
            initial: 'KJ',
            field: 'ui-ux',
            attendance: 58,
            rank: 15,
            projects: 1,
            joinedYear: 2024,
        },
        {
            id: 16,
            name: 'Emma Davis',
            avatar: '/avatars/emma.jpg',
            initial: 'ED',
            field: 'programming',
            attendance: 55,
            rank: 16,
            projects: 1,
            joinedYear: 2023,
        },
        {
            id: 17,
            name: 'Michael Clark',
            avatar: '/avatars/michael.jpg',
            initial: 'MC',
            field: 'cyber-security',
            attendance: 52,
            rank: 17,
            projects: 1,
            joinedYear: 2024,
        },
        {
            id: 18,
            name: 'Jessica White',
            avatar: '/avatars/jessica.jpg',
            initial: 'JW',
            field: 'ui-ux',
            attendance: 50,
            rank: 18,
            projects: 1,
            joinedYear: 2023,
        },
        {
            id: 19,
            name: 'Christopher Lee',
            avatar: '/avatars/chris.jpg',
            initial: 'CL',
            field: 'programming',
            attendance: 48,
            rank: 19,
            projects: 0,
            joinedYear: 2024,
        },
        {
            id: 20,
            name: 'Amanda Garcia',
            avatar: '/avatars/amanda.jpg',
            initial: 'AG',
            field: 'cyber-security',
            attendance: 45,
            rank: 20,
            projects: 0,
            joinedYear: 2023,
        },
        {
            id: 21,
            name: 'Brian Miller',
            avatar: '/avatars/brian.jpg',
            initial: 'BM',
            field: 'ui-ux',
            attendance: 42,
            rank: 21,
            projects: 0,
            joinedYear: 2024,
        },
        {
            id: 22,
            name: 'Nicole Wilson',
            avatar: '/avatars/nicole.jpg',
            initial: 'NW',
            field: 'programming',
            attendance: 40,
            rank: 22,
            projects: 0,
            joinedYear: 2023,
        },
        {
            id: 23,
            name: 'Jason Moore',
            avatar: '/avatars/jason.jpg',
            initial: 'JM',
            field: 'cyber-security',
            attendance: 38,
            rank: 23,
            projects: 0,
            joinedYear: 2024,
        },
        {
            id: 24,
            name: 'Michelle Harris',
            avatar: '/avatars/michelle.jpg',
            initial: 'MH',
            field: 'ui-ux',
            attendance: 35,
            rank: 24,
            projects: 0,
            joinedYear: 2023,
        },
        {
            id: 25,
            name: 'Robert Taylor',
            avatar: '/avatars/robert.jpg',
            initial: 'RT',
            field: 'programming',
            attendance: 33,
            rank: 25,
            projects: 0,
            joinedYear: 2024,
        },
        {
            id: 26,
            name: 'Jennifer Brown',
            avatar: '/avatars/jennifer.jpg',
            initial: 'JB',
            field: 'cyber-security',
            attendance: 30,
            rank: 26,
            projects: 0,
            joinedYear: 2023,
        },
        {
            id: 27,
            name: 'William Davis',
            avatar: '/avatars/william.jpg',
            initial: 'WD',
            field: 'ui-ux',
            attendance: 28,
            rank: 27,
            projects: 0,
            joinedYear: 2024,
        },
        {
            id: 28,
            name: 'Elizabeth Wilson',
            avatar: '/avatars/elizabeth.jpg',
            initial: 'EW',
            field: 'programming',
            attendance: 25,
            rank: 28,
            projects: 0,
            joinedYear: 2023,
        },
        {
            id: 29,
            name: 'Richard Moore',
            avatar: '/avatars/richard.jpg',
            initial: 'RM',
            field: 'cyber-security',
            attendance: 22,
            rank: 29,
            projects: 0,
            joinedYear: 2024,
        },
        {
            id: 30,
            name: 'Susan Johnson',
            avatar: '/avatars/susan.jpg',
            initial: 'SJ',
            field: 'ui-ux',
            attendance: 20,
            rank: 30,
            projects: 0,
            joinedYear: 2023,
        },
        {
            id: 31,
            name: 'Thomas Anderson',
            avatar: '/avatars/thomas.jpg',
            initial: 'TA',
            field: 'programming',
            attendance: 18,
            rank: 31,
            projects: 0,
            joinedYear: 2024,
        },
        {
            id: 32,
            name: 'Patricia Martin',
            avatar: '/avatars/patricia.jpg',
            initial: 'PM',
            field: 'cyber-security',
            attendance: 15,
            rank: 32,
            projects: 0,
            joinedYear: 2023,
        },
        {
            id: 33,
            name: 'Charles Thompson',
            avatar: '/avatars/charles.jpg',
            initial: 'CT',
            field: 'ui-ux',
            attendance: 12,
            rank: 33,
            projects: 0,
            joinedYear: 2024,
        },
        {
            id: 34,
            name: 'Karen Garcia',
            avatar: '/avatars/karen.jpg',
            initial: 'KG',
            field: 'programming',
            attendance: 10,
            rank: 34,
            projects: 0,
            joinedYear: 2023,
        },
        {
            id: 35,
            name: 'Christopher Martinez',
            avatar: '/avatars/christopher.jpg',
            initial: 'CM',
            field: 'cyber-security',
            attendance: 8,
            rank: 35,
            projects: 0,
            joinedYear: 2024,
        },
    ];

    const fields = [
        { value: 'all', label: 'All Fields' },
        { value: 'programming', label: 'Programming' },
        { value: 'cyber-security', label: 'Cyber Security' },
        { value: 'ui-ux', label: 'UI/UX Design' },
    ];

    const years = ['2024', '2023', '2022'];

    // Calculate pagination
    const totalItems = leaderboardData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = leaderboardData.slice(startIndex, endIndex);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            const filteredData = mockLeaderboardData
                .filter((member) => (selectedField === 'all' || member.field === selectedField) && member.joinedYear <= parseInt(selectedYear))
                .sort((a, b) => b.attendance - a.attendance) // Sort by attendance descending
                .map((member, index) => ({
                    ...member,
                    rank: index + 1,
                }));

            setLeaderboardData(filteredData);
            setIsLoading(false);
            setCurrentPage(1); // Reset to first page when filters change
        }, 500);

        return () => clearTimeout(timer);
    }, [selectedYear, selectedField]);

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return <Crown className="h-6 w-6 fill-yellow-500 text-yellow-500" />;
            case 2:
                return <Medal className="h-6 w-6 fill-gray-400 text-gray-400" />;
            case 3:
                return <Medal className="h-6 w-6 fill-amber-700 text-amber-700" />;
            default:
                return <span className="text-lg font-bold">{rank}</span>;
        }
    };

    const getFieldColor = (field: string) => {
        switch (field) {
            case 'programming':
                return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
            case 'cyber-security':
                return 'bg-green-500/20 text-green-300 border-green-500/30';
            case 'ui-ux':
                return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
            default:
                return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
        }
    };

    const getFieldLabel = (field: string) => {
        switch (field) {
            case 'programming':
                return 'Programming';
            case 'cyber-security':
                return 'Cyber Security';
            case 'ui-ux':
                return 'UI/UX Design';
            default:
                return field;
        }
    };

    const getAttendanceColor = (attendance: number) => {
        if (attendance >= 90) return 'text-green-400';
        if (attendance >= 80) return 'text-yellow-400';
        if (attendance >= 70) return 'text-orange-400';
        return 'text-red-400';
    };

    const getCurrentFieldLabel = () => {
        return fields.find((field) => field.value === selectedField)?.label || 'All Fields';
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (value: string) => {
        setItemsPerPage(Number(value));
        setCurrentPage(1);
    };

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            const startPage = Math.max(1, currentPage - 2);
            const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
        }

        return pages;
    };

    return (
        <div className="min-h-screen bg-[#161616] py-8 text-[#EFEEEA]">
            <div className="mx-auto max-w-6xl px-6">
                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="mb-4 flex items-center justify-center gap-3">
                        <Trophy className="h-8 w-8 text-yellow-500" />
                        <h1 className="font-primary text-4xl font-bold">Leaderboard</h1>
                    </div>
                    <p className="mx-auto max-w-2xl text-xl text-[var(--color-secondary)]">
                        Track member activity and attendance across different fields. Recognize our most dedicated members!
                    </p>
                </div>
                {/* Stats Summary
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                    <Card className="border-[#2a2a2a] bg-[#1a1a1a]">
                        <CardContent className="p-6 text-center">
                            <div className="mb-2 font-primary text-2xl font-bold text-yellow-500">
                                {leaderboardData.find((m) => m.rank === 1)?.name || '-'}
                            </div>
                            <div className="text-[var(--color-secondary)]">Top Performer</div>
                        </CardContent>
                    </Card>

                    <Card className="border-[#2a2a2a] bg-[#1a1a1a]">
                        <CardContent className="p-6 text-center">
                            <div className="mb-2 font-primary text-2xl font-bold text-green-400">
                                {Math.round(leaderboardData.reduce((acc, curr) => acc + curr.attendance, 0) / leaderboardData.length) || 0}%
                            </div>
                            <div className="text-[var(--color-secondary)]">Average Attendance</div>
                        </CardContent>
                    </Card>

                    <Card className="border-[#2a2a2a] bg-[#1a1a1a]">
                        <CardContent className="p-6 text-center">
                            <div className="mb-2 font-primary text-2xl font-bold text-blue-400">{leaderboardData.length}</div>
                            <div className="text-[var(--color-secondary)]">Active Members</div>
                        </CardContent>
                    </Card>
                </div> */}
                {/* Filters */}
                <Card className="mb-8 border-[#2a2a2a] bg-[#1a1a1a]">
                    <CardContent className="p-6">
                        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                            <div className="flex items-center gap-2">
                                <Filter className="h-5 w-5 text-[var(--color-secondary)]" />
                                <span className="font-medium text-[#EFEEEA]">Filters:</span>
                            </div>

                            <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
                                {/* Custom Year Select */}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsYearOpen(!isYearOpen)}
                                        className="flex w-full items-center justify-between rounded-md border border-[#2a2a2a] bg-[#161616] px-3 py-2 text-[#EFEEEA] transition-colors hover:border-[var(--color-secondary)] sm:w-32"
                                    >
                                        <span>{selectedYear}</span>
                                        <ChevronDown className="h-4 w-4" />
                                    </button>
                                    {isYearOpen && (
                                        <div className="absolute top-full right-0 left-0 z-10 mt-1 rounded-md border border-[#2a2a2a] bg-[#1a1a1a] shadow-lg">
                                            {years.map((year) => (
                                                <button
                                                    key={year}
                                                    onClick={() => {
                                                        setSelectedYear(year);
                                                        setIsYearOpen(false);
                                                    }}
                                                    className={`w-full px-3 py-2 text-left transition-colors hover:bg-[#2a2a2a] ${
                                                        selectedYear === year
                                                            ? 'bg-[var(--color-secondary)]/20 text-[var(--color-secondary)]'
                                                            : 'text-[#EFEEEA]'
                                                    }`}
                                                >
                                                    {year}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Custom Field Select */}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsFieldOpen(!isFieldOpen)}
                                        className="flex w-full items-center justify-between rounded-md border border-[#2a2a2a] bg-[#161616] px-3 py-2 text-[#EFEEEA] transition-colors hover:border-[var(--color-secondary)] sm:w-48"
                                    >
                                        <span>{getCurrentFieldLabel()}</span>
                                        <ChevronDown className="h-4 w-4" />
                                    </button>
                                    {isFieldOpen && (
                                        <div className="absolute top-full right-0 left-0 z-10 mt-1 rounded-md border border-[#2a2a2a] bg-[#1a1a1a] shadow-lg">
                                            {fields.map((field) => (
                                                <button
                                                    key={field.value}
                                                    onClick={() => {
                                                        setSelectedField(field.value);
                                                        setIsFieldOpen(false);
                                                    }}
                                                    className={`w-full px-3 py-2 text-left transition-colors hover:bg-[#2a2a2a] ${
                                                        selectedField === field.value
                                                            ? 'bg-[var(--color-secondary)]/20 text-[var(--color-secondary)]'
                                                            : 'text-[#EFEEEA]'
                                                    }`}
                                                >
                                                    {field.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <Button
                                    variant="outline"
                                    className="border-[var(--color-secondary)] text-[#EFEEEA] hover:bg-[var(--color-secondary)]/10"
                                    onClick={() => {
                                        setSelectedYear('2024');
                                        setSelectedField('all');
                                    }}
                                >
                                    Reset Filters
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {/* Items Per Page Selector */}
                <div className="mb-4 flex items-center justify-between">
                    <div className="text-sm text-[var(--color-secondary)]">
                        Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} members
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-[var(--color-secondary)]">Show:</span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => handleItemsPerPageChange(e.target.value)}
                            className="rounded-md border border-[#2a2a2a] bg-[#161616] px-2 py-1 text-sm text-[#EFEEEA]"
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                </div>
                {/* Leaderboard Table */}
                <Card className="mb-8 border-[#2a2a2a] bg-[#1a1a1a]">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-primary text-[#EFEEEA]">
                            <Trophy className="h-5 w-5 text-yellow-500" />
                            Member Rankings
                        </CardTitle>
                        <CardDescription className="text-[var(--color-secondary)]">
                            Sorted by attendance performance - Page {currentPage} of {totalPages}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="py-8 text-center">
                                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-[var(--color-secondary)]"></div>
                                <p className="mt-4 text-[var(--color-secondary)]">Loading leaderboard data...</p>
                            </div>
                        ) : leaderboardData.length === 0 ? (
                            <div className="py-8 text-center">
                                <p className="text-[var(--color-secondary)]">No members found for the selected filters.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {currentItems.map((member) => (
                                    <div
                                        key={member.id}
                                        className={`flex items-center gap-4 rounded-lg border p-4 transition-all duration-300 ${
                                            member.rank <= 3
                                                ? 'border-yellow-500/30 bg-gradient-to-r from-[#2a2a2a] to-[#1a1a1a] shadow-lg'
                                                : 'border-[#2a2a2a] bg-[#161616] hover:border-[var(--color-secondary)]'
                                        }`}
                                    >
                                        {/* Rank */}
                                        <div className="flex h-12 w-12 items-center justify-center">{getRankIcon(member.rank)}</div>

                                        {/* Avatar and Name */}
                                        <div className="flex flex-1 items-center gap-4">
                                            <Avatar className="h-12 w-12 border-2 border-[#2a2a2a]">
                                                <AvatarImage src={member.avatar} />
                                                <AvatarFallback className="bg-[#EFEEEA] font-primary text-[#161616]">{member.initial}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="font-primary font-bold text-[#EFEEEA]">
                                                    {member.name}
                                                    {member.rank <= 3 && <Star className="ml-2 inline-block h-4 w-4 text-yellow-500" />}
                                                </h3>
                                                <Badge variant="secondary" className={`mt-1 border ${getFieldColor(member.field)}`}>
                                                    {getFieldLabel(member.field)}
                                                </Badge>
                                            </div>
                                        </div>

                                        {/* Stats - Hanya Attendance dan Projects */}
                                        <div className="hidden items-center gap-8 text-sm md:flex">
                                            <div className="text-center">
                                                <div className="text-[var(--color-secondary)]">Attendance</div>
                                                <div className={`font-bold ${getAttendanceColor(member.attendance)}`}>{member.attendance}%</div>
                                            </div>
                                            {/* <div className="text-center">
                                                <div className="text-[var(--color-secondary)]">Projects</div>
                                                <div className="font-bold text-[#EFEEEA]">{member.projects}</div>
                                            </div> */}
                                        </div>

                                        {/* Mobile Stats - Hanya Attendance dan Projects */}
                                        <div className="flex items-center gap-6 md:hidden">
                                            <div className="text-center">
                                                <div className="text-xs text-[var(--color-secondary)]">Attendance</div>
                                                <div className={`text-sm font-bold ${getAttendanceColor(member.attendance)}`}>
                                                    {member.attendance}%
                                                </div>
                                            </div>
                                            {/* <div className="text-center">
                                                <div className="text-xs text-[var(--color-secondary)]">Projects</div>
                                                <div className="text-sm font-bold text-[#EFEEEA]">{member.projects}</div>
                                            </div> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
                {/* Pagination */}
                {totalPages > 1 && (
                    <Card className="border-[#2a2a2a] bg-[#1a1a1a]">
                        <CardContent className="p-6">
                            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                                <div className="text-sm text-[var(--color-secondary)]">
                                    Page {currentPage} of {totalPages} • {totalItems} total members
                                </div>

                                <div className="flex items-center gap-2">
                                    {/* Previous Button */}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="border-[#2a2a2a] text-[#EFEEEA] hover:bg-[#2a2a2a]"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>

                                    {/* Page Numbers */}
                                    {getPageNumbers().map((page) => (
                                        <Button
                                            key={page}
                                            variant={currentPage === page ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => handlePageChange(page)}
                                            className={
                                                currentPage === page
                                                    ? 'bg-[#EFEEEA] text-[#161616] hover:bg-[#e0ded9]'
                                                    : 'border-[#2a2a2a] text-[#EFEEEA] hover:bg-[#2a2a2a]'
                                            }
                                        >
                                            {page}
                                        </Button>
                                    ))}

                                    {/* Next Button */}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="border-[#2a2a2a] text-[#EFEEEA] hover:bg-[#2a2a2a]"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
                {/* Legend
                <Card className="mt-8 border-[#2a2a2a] bg-[#1a1a1a]">
                    <CardContent className="p-6">
                        <h3 className="mb-4 font-primary font-bold text-[#EFEEEA]">How Points are Calculated</h3>
                        <div className="grid grid-cols-1 gap-4 text-sm text-[var(--color-secondary)] md:grid-cols-2">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                <span>Attendance (90-100%): 20 points per session</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                <span>Attendance (80-89%): 15 points per session</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                                <span>Attendance (70-79%): 10 points per session</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                <span>Attendance (below 70%): 5 points per session</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                                <span>Project Completion: 100 points per project</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                                <span>Special Contributions: 50 points each</span>
                            </div>
                        </div>
                    </CardContent>
                </Card> */}
            </div>

            {/* Close dropdown when clicking outside */}
            {(isYearOpen || isFieldOpen) && (
                <div
                    className="fixed inset-0 z-0"
                    onClick={() => {
                        setIsYearOpen(false);
                        setIsFieldOpen(false);
                    }}
                />
            )}
        </div>
    );
};

export default Leaderboard;
