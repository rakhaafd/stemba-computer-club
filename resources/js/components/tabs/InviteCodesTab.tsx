import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@components/ui/table";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { router, useForm, usePage } from "@inertiajs/react";
import axios from "axios";

interface InviteCode {
    id: number;
    code: string;
    generation_year: string;
    created_at: string;
    usage: number;
    usage_total: number;
    is_activated: boolean;
}

interface InviteCodesTabProps {
    inviteCodes: InviteCode[];
    setInviteCodes: (codes: InviteCode[]) => void;
}

const InviteCodesTab = () => {
    const [inviteCodes, setInviteCodes] = useState<InviteCode[]>([]);
    useEffect(() => {
    axios.get("/api/admin/code")
        .then(res => {
            console.log("API RESULT:", res.data);
            setInviteCodes(res.data);
        })
        .catch(err => console.error(err));
}, []);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset
    } = useForm({
        generation_year: "",
        usage_total: "",
    });

    // ⬇️ Submit handler
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post("/admin/code", {
            onSuccess: () => {
                reset(); // reset form setelah sukses
            },
        });
    };

    const toggleCodeStatus = (id: number) => {
        console.log(id)
        router.put(`/admin/code/${id}`)
        const updatedCodes = inviteCodes.map((code) =>
            code.id === id ? { ...code, is_activated: !code.is_activated } : code
        );
        setInviteCodes(updatedCodes);
    };

    return (
        <div className="space-y-6">
            {/* Card: Buat Invite Code */}
            <Card className="border-[#2a2a2a] bg-[#1a1a1a]">
                <CardHeader>
                    <CardTitle className="font-primary text-[#EFEEEA]">Generate New Invite Code</CardTitle>
                    <CardDescription className="text-[var(--color-secondary)]">
                        Create unique invite codes for different student periods
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={handleSubmit}
                        className="mb-4 grid gap-4 md:grid-cols-3"
                    >
                        <Input
                            type="text"
                            placeholder="Period (e.g., 2027)"
                            value={data.generation_year}
                            onChange={(e) => setData("generation_year", e.target.value)}
                            className="border-[#2a2a2a] bg-[#161616] text-[#EFEEEA]"
                        />

                        <Input
                            type="number"
                            placeholder="Max Uses"
                            value={data.usage_total}
                            onChange={(e) => setData("usage_total", e.target.value)}
                            className="border-[#2a2a2a] bg-[#161616] text-[#EFEEEA]"
                        />

                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-[#EFEEEA] text-[#161616] hover:bg-[#e0ded9]"
                        >
                            Generate Code
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Card: List Invite Codes */}
            <Card className="border-[#2a2a2a] bg-[#1a1a1a]">
                <CardHeader>
                    <CardTitle className="font-primary text-[#EFEEEA]">
                        Active Invite Codes
                    </CardTitle>
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
                                    <TableCell className="text-[var(--color-secondary)]">{code.generation_year}</TableCell>
                                    <TableCell className="text-[var(--color-secondary)]">{code.created_at}</TableCell>
                                    <TableCell className="text-[var(--color-secondary)]">
                                        {code.usage}/{code.usage_total}
                                    </TableCell>
                                    <TableCell>
                                        <Badge 
                                            className={
                                                code.is_activated
                                                    ? "border-green-500/30 bg-green-500/20 text-green-400"
                                                    : "border-red-500/30 bg-red-500/20 text-red-400"
                                            }
                                        >
                                            {code.is_activated ? "Active" : "Inactive"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => toggleCodeStatus(code.id)}
                                            className="border-[var(--color-secondary)] text-[#EFEEEA] hover:bg-[var(--color-secondary)]/10"
                                        >
                                            {code.is_activated ? "Deactivate" : "Activate"}
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

export default InviteCodesTab;