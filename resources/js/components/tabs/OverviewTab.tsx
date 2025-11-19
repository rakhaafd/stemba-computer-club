import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table';
import { Badge } from '@components/ui/badge';

interface OverviewTabProps {
    attendanceData: any[];
    leaderboardData: any[];
    inviteCodes: any[];
}

const OverviewTab = ({ attendanceData, leaderboardData, inviteCodes }: OverviewTabProps) => {
    return (
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
                                                    : 'border-red-500/30 bg-red-500-20 text-red-400'
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
    );
};

export default OverviewTab;