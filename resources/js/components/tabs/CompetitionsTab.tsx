import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';
import { Badge } from '@components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table';

interface Competition {
    id: number;
    name: string;
    type: string;
    startDate: string;
    endDate: string;
    registrationDeadline: string;
    maxParticipants: number;
    status: 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled';
    participants: number;
    description: string;
    prizes: string;
    links: string;
    requirements: string[];
    contactPerson: string;
    contactEmail: string;
    createdAt: string;
}

interface CompetitionsTabProps {
    competitions?: Competition[];
    setCompetitions?: (competitions: Competition[]) => void;
}

const CompetitionsTab = ({ competitions = [], setCompetitions }: CompetitionsTabProps) => {
    const [isAddingCompetition, setIsAddingCompetition] = useState(false);
    const [newCompetition, setNewCompetition] = useState({
        name: '',
        type: '',
        startDate: '',
        endDate: '',
        registrationDeadline: '',
        maxParticipants: 0,
        description: '',
        prizes: '',
        links: '',
        requirements: [''] as string[],
        contactPerson: '',
        contactEmail: '',
    });

    // Default competitions data
    const defaultCompetitions: Competition[] = [
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
    ];

    const competitionsData = competitions.length > 0 ? competitions : defaultCompetitions;

    const addRequirement = () => {
        setNewCompetition({
            ...newCompetition,
            requirements: [...newCompetition.requirements, ''],
        });
    };

    const updateRequirement = (index: number, value: string) => {
        const updatedRequirements = [...newCompetition.requirements];
        updatedRequirements[index] = value;
        setNewCompetition({
            ...newCompetition,
            requirements: updatedRequirements,
        });
    };

    const removeRequirement = (index: number) => {
        const updatedRequirements = newCompetition.requirements.filter((_, i) => i !== index);
        setNewCompetition({
            ...newCompetition,
            requirements: updatedRequirements,
        });
    };

    const handleSaveCompetition = () => {
        if (!newCompetition.name || !newCompetition.type || !newCompetition.startDate || !newCompetition.endDate) {
            alert('Please fill in all required fields');
            return;
        }

        const competition: Competition = {
            id: competitionsData.length + 1,
            name: newCompetition.name,
            type: newCompetition.type,
            startDate: newCompetition.startDate,
            endDate: newCompetition.endDate,
            registrationDeadline: newCompetition.registrationDeadline,
            maxParticipants: newCompetition.maxParticipants,
            status: 'draft',
            participants: 0,
            description: newCompetition.description,
            prizes: newCompetition.prizes,
            links: newCompetition.links,
            requirements: newCompetition.requirements.filter(req => req.trim() !== ''),
            contactPerson: newCompetition.contactPerson,
            contactEmail: newCompetition.contactEmail,
            createdAt: new Date().toISOString().split('T')[0],
        };

        if (setCompetitions) {
            setCompetitions([...competitionsData, competition]);
        }

        // Reset form
        setNewCompetition({
            name: '',
            type: '',
            startDate: '',
            endDate: '',
            registrationDeadline: '',
            maxParticipants: 0,
            description: '',
            prizes: '',
            links: '',
            requirements: [''],
            contactPerson: '',
            contactEmail: '',
        });
        setIsAddingCompetition(false);
    };

    const getStatusBadge = (status: Competition['status']) => {
        const statusConfig = {
            draft: { color: 'bg-gray-500/20 text-gray-400 border-gray-500/30', label: 'Draft' },
            published: { color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', label: 'Published' },
            ongoing: { color: 'bg-green-500/20 text-green-400 border-green-500/30', label: 'Ongoing' },
            completed: { color: 'bg-purple-500/20 text-purple-400 border-purple-500/30', label: 'Completed' },
            cancelled: { color: 'bg-red-500/20 text-red-400 border-red-500/30', label: 'Cancelled' },
        };

        const config = statusConfig[status];
        return (
            <Badge variant="secondary" className={config.color}>
                {config.label}
            </Badge>
        );
    };

    const getTypeLabel = (type: string) => {
        const typeLabels: { [key: string]: string } = {
            programming: 'Programming',
            uiux: 'UI/UX Design',
            cybersecurity: 'Cyber Security',
            robotics: 'Robotics',
            'data-science': 'Data Science',
            other: 'Other',
        };
        return typeLabels[type] || type;
    };

    return (
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
                        <Button 
                            onClick={() => setIsAddingCompetition(!isAddingCompetition)}
                            className="bg-[var(--color-secondary)] text-[#161616] hover:bg-[var(--color-secondary)]/90"
                        >
                            {isAddingCompetition ? 'Cancel' : 'Add Competition'}
                        </Button>
                    </div>
                </CardHeader>
            </Card>

            {/* Add Competition Form */}
            {isAddingCompetition && (
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
                                    value={newCompetition.name}
                                    onChange={(e) => setNewCompetition({ ...newCompetition, name: e.target.value })}
                                    className="border-[#2a2a2a] bg-[#161616] text-[#EFEEEA] placeholder:text-[var(--color-secondary)]"
                                />
                            </div>

                            {/* Competition Type */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#EFEEEA]">Competition Type *</label>
                                <Select value={newCompetition.type} onValueChange={(value) => setNewCompetition({ ...newCompetition, type: value })}>
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
                                <Input 
                                    type="date" 
                                    value={newCompetition.startDate}
                                    onChange={(e) => setNewCompetition({ ...newCompetition, startDate: e.target.value })}
                                    className="border-[#2a2a2a] bg-[#161616] text-[#EFEEEA]" 
                                />
                            </div>

                            {/* End Date */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#EFEEEA]">End Date *</label>
                                <Input 
                                    type="date" 
                                    value={newCompetition.endDate}
                                    onChange={(e) => setNewCompetition({ ...newCompetition, endDate: e.target.value })}
                                    className="border-[#2a2a2a] bg-[#161616] text-[#EFEEEA]" 
                                />
                            </div>

                            {/* Registration Deadline */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#EFEEEA]">Registration Deadline</label>
                                <Input 
                                    type="datetime-local" 
                                    value={newCompetition.registrationDeadline}
                                    onChange={(e) => setNewCompetition({ ...newCompetition, registrationDeadline: e.target.value })}
                                    className="border-[#2a2a2a] bg-[#161616] text-[#EFEEEA]" 
                                />
                            </div>

                            {/* Maximum Participants */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#EFEEEA]">Max Participants</label>
                                <Input
                                    type="number"
                                    placeholder="0 for unlimited"
                                    value={newCompetition.maxParticipants}
                                    onChange={(e) => setNewCompetition({ ...newCompetition, maxParticipants: parseInt(e.target.value) || 0 })}
                                    className="border-[#2a2a2a] bg-[#161616] text-[#EFEEEA]"
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium text-[#EFEEEA]">Description *</label>
                                <textarea
                                    placeholder="Enter competition description, rules, and requirements..."
                                    rows={4}
                                    value={newCompetition.description}
                                    onChange={(e) => setNewCompetition({ ...newCompetition, description: e.target.value })}
                                    className="w-full rounded-md border border-[#2a2a2a] bg-[#161616] px-3 py-2 text-[#EFEEEA] placeholder:text-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-secondary)] focus:outline-none"
                                />
                            </div>

                            {/* Prize Information */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium text-[#EFEEEA]">Prize Information</label>
                                <textarea
                                    placeholder="List prizes for winners..."
                                    rows={3}
                                    value={newCompetition.prizes}
                                    onChange={(e) => setNewCompetition({ ...newCompetition, prizes: e.target.value })}
                                    className="w-full rounded-md border border-[#2a2a2a] bg-[#161616] px-3 py-2 text-[#EFEEEA] placeholder:text-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-secondary)] focus:outline-none"
                                />
                            </div>

                            {/* Link Information */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium text-[#EFEEEA]">Link Information</label>
                                <textarea
                                    placeholder="Link competition...."
                                    rows={3}
                                    value={newCompetition.links}
                                    onChange={(e) => setNewCompetition({ ...newCompetition, links: e.target.value })}
                                    className="w-full rounded-md border border-[#2a2a2a] bg-[#161616] px-3 py-2 text-[#EFEEEA] placeholder:text-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-secondary)] focus:outline-none"
                                />
                            </div>

                            {/* Eligibility Requirements */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium text-[#EFEEEA]">Eligibility Requirements</label>
                                <div className="space-y-2">
                                    {newCompetition.requirements.map((req, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <Input 
                                                value={req}
                                                onChange={(e) => updateRequirement(index, e.target.value)}
                                                placeholder="Enter requirement..."
                                                className="border-[#2a2a2a] bg-[#161616] text-[#EFEEEA]" 
                                            />
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => removeRequirement(index)}
                                                className="border-red-500/30 text-red-400 hover:bg-red-500/20"
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    ))}
                                    <Button
                                        variant="outline"
                                        onClick={addRequirement}
                                        className="border-[#2a2a2a] text-[var(--color-secondary)] hover:bg-[#2a2a2a]"
                                    >
                                        Add Requirement
                                    </Button>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#EFEEEA]">Contact Person</label>
                                <Input 
                                    placeholder="Contact person name" 
                                    value={newCompetition.contactPerson}
                                    onChange={(e) => setNewCompetition({ ...newCompetition, contactPerson: e.target.value })}
                                    className="border-[#2a2a2a] bg-[#161616] text-[#EFEEEA]" 
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#EFEEEA]">Contact Email</label>
                                <Input
                                    type="email"
                                    placeholder="contact@example.com"
                                    value={newCompetition.contactEmail}
                                    onChange={(e) => setNewCompetition({ ...newCompetition, contactEmail: e.target.value })}
                                    className="border-[#2a2a2a] bg-[#161616] text-[#EFEEEA]"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6 flex gap-3">
                            <Button 
                                onClick={handleSaveCompetition}
                                className="bg-[var(--color-secondary)] text-[#161616] hover:bg-[var(--color-secondary)]/90"
                            >
                                Save Competition
                            </Button>
                            <Button 
                                variant="outline" 
                                onClick={() => setIsAddingCompetition(false)}
                                className="border-[#2a2a2a] text-[#EFEEEA] hover:bg-[#2a2a2a]"
                            >
                                Cancel
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Existing Competitions List */}
            <Card className="border-[#2a2a2a] bg-[#1a1a1a]">
                <CardHeader>
                    <CardTitle className="font-primary text-[#EFEEEA]">Existing Competitions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {competitionsData.length === 0 ? (
                            <div className="py-8 text-center text-[var(--color-secondary)]">
                                <p>No competitions added yet</p>
                                <p className="text-sm">Start by adding your first competition above</p>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-[#2a2a2a]">
                                        <TableHead className="text-white">Competition Name</TableHead>
                                        <TableHead className="text-white">Type</TableHead>
                                        <TableHead className="text-white">Dates</TableHead>
                                        <TableHead className="text-white">Participants</TableHead>
                                        <TableHead className="text-white">Status</TableHead>
                                        <TableHead className="text-white">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {competitionsData.map((competition) => (
                                        <TableRow key={competition.id} className="border-[#2a2a2a]">
                                            <TableCell className="font-medium text-[#EFEEEA]">
                                                {competition.name}
                                            </TableCell>
                                            <TableCell className="text-[var(--color-secondary)]">
                                                {getTypeLabel(competition.type)}
                                            </TableCell>
                                            <TableCell className="text-[var(--color-secondary)]">
                                                {competition.startDate} to {competition.endDate}
                                            </TableCell>
                                            <TableCell className="text-[var(--color-secondary)]">
                                                {competition.participants}
                                                {competition.maxParticipants > 0 && ` / ${competition.maxParticipants}`}
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(competition.status)}
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
                                                        className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                                                    >
                                                        View
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CompetitionsTab;