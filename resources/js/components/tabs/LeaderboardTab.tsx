import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';

interface Student {
    rank: number;
    name: string;
    class: string;
    branch: string;
    attendance: number;
    total: number;
}

interface LeaderboardTabProps {
    leaderboardData: Student[];
}

const LeaderboardTab = ({ leaderboardData }: LeaderboardTabProps) => {
    return (
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

            {/* Additional Statistics */}
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="border-[#2a2a2a] bg-[#1a1a1a]">
                    <CardContent className="p-6">
                        <div className="text-center">
                            <div className="mb-2 font-primary text-3xl font-bold text-yellow-400">🥇</div>
                            <div className="font-medium text-[#EFEEEA]">Top Performer</div>
                            <div className="text-sm text-[var(--color-secondary)]">
                                {leaderboardData[0]?.name || 'N/A'}
                            </div>
                            <Badge variant="secondary" className="mt-2 bg-yellow-500/20 text-yellow-400">
                                {leaderboardData[0]?.attendance}/{leaderboardData[0]?.total} sessions
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-[#2a2a2a] bg-[#1a1a1a]">
                    <CardContent className="p-6">
                        <div className="text-center">
                            <div className="mb-2 font-primary text-3xl font-bold text-gray-300">🥈</div>
                            <div className="font-medium text-[#EFEEEA]">Runner Up</div>
                            <div className="text-sm text-[var(--color-secondary)]">
                                {leaderboardData[1]?.name || 'N/A'}
                            </div>
                            <Badge variant="secondary" className="mt-2 bg-gray-500/20 text-gray-300">
                                {leaderboardData[1]?.attendance}/{leaderboardData[1]?.total} sessions
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-[#2a2a2a] bg-[#1a1a1a]">
                    <CardContent className="p-6">
                        <div className="text-center">
                            <div className="mb-2 font-primary text-3xl font-bold text-orange-400">🥉</div>
                            <div className="font-medium text-[#EFEEEA]">Third Place</div>
                            <div className="text-sm text-[var(--color-secondary)]">
                                {leaderboardData[2]?.name || 'N/A'}
                            </div>
                            <Badge variant="secondary" className="mt-2 bg-orange-500/20 text-orange-400">
                                {leaderboardData[2]?.attendance}/{leaderboardData[2]?.total} sessions
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default LeaderboardTab;