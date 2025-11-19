import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';

interface Leaderboard {
    id: number;
    name: string;
    class: string;
    branch: string;
    attendance: number;
    total: number;
}

interface LeaderboardTabProps {
    Leaderboards: Leaderboard[];
    setLeaderboards: (codes: Leaderboard[]) => void;
}

const LeaderboardTab = ({ Leaderboards, setLeaderboards }: LeaderboardTabProps) => {
    const [newCode, setNewCode] = useState({
        code: '',
        period: '',
        maxUses: 50,
    });

    const generateLeaderboard = () => {
        const code = `STEMBA${newCode.period || '2027'}`;
        const updatedCodes = [
            ...Leaderboards,
            {
                id: Leaderboards.length + 1,
                code,
                period: newCode.period || '2027',
                createdAt: new Date().toISOString().split('T')[0],
                uses: 0,
                maxUses: newCode.maxUses,
                isActive: true,
            },
        ];
        setLeaderboards(updatedCodes);
        setNewCode({ code: '', period: '', maxUses: 50 });
    };

    const toggleCodeStatus = (id: number) => {
        const updatedCodes = Leaderboards.map((code) => 
            code.id === id ? { ...code, isActive: !code.isActive } : code
        );
        setLeaderboards(updatedCodes);
    };

    return (
        <div className="space-y-6">
            <Card className="border-[#2a2a2a] bg-[#1a1a1a]">
                <CardHeader>
                    <CardTitle className="font-primary text-[#EFEEEA]">Generate New Invite Code</CardTitle>
                    <CardDescription className="text-[var(--color-secondary)]">
                        Create unique invite codes for different student periods
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-4 grid gap-4 md:grid-cols-3">
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
                        <Button onClick={generateLeaderboard} className="bg-[#EFEEEA] text-[#161616] hover:bg-[#e0ded9]">
                            Generate Code
                        </Button>
                    </div>
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
                            {Leaderboards.map((code) => (
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
    );
};

export default LeaderboardTab;