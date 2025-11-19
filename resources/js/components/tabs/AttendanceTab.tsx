import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table';
import { Badge } from '@components/ui/badge';
import { Input } from '@components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';

interface AttendanceRecord {
    id: number;
    name: string;
    class: string;
    email: string;
    branch: string;
    date: string;
    status: string;
}

interface AttendanceTabProps {
    attendanceData: AttendanceRecord[];
}

const AttendanceTab = ({ attendanceData }: AttendanceTabProps) => {
    return (
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
    );
};

export default AttendanceTab;