import { useState, useEffect } from 'react';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Input } from '@components/ui/input';
import { Badge } from '@components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isVisible, setIsVisible] = useState(false);

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
    maxUses: 50
  });

  const stats = [
    { number: "127", label: "Total Members", change: "+12 this month" },
    { number: "89%", label: "Attendance Rate", change: "+5% from last month" },
    { number: "3", label: "Active Periods", change: "2025, 2026, 2027" },
    { number: "16", label: "Weekly Sessions", change: "This academic year" }
  ];

  const generateInviteCode = () => {
    const code = `STEMBA${newCode.period || '2027'}`;
    setInviteCodes([...inviteCodes, {
      id: inviteCodes.length + 1,
      code,
      period: newCode.period || '2027',
      createdAt: new Date().toISOString().split('T')[0],
      uses: 0,
      maxUses: newCode.maxUses,
      isActive: true
    }]);
    setNewCode({ code: '', period: '', maxUses: 50 });
  };

  const toggleCodeStatus = (id: number) => {
    setInviteCodes(inviteCodes.map(code => 
      code.id === id ? { ...code, isActive: !code.isActive } : code
    ));
  };

  return (
    <div className="min-h-screen bg-[#161616] text-[#EFEEEA] overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#161616]/90 backdrop-blur-sm z-50 border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#EFEEEA] rounded-full flex items-center justify-center">
                <span className="text-[#161616] font-bold text-lg font-primary">SCC</span>
              </div>
              <span className="text-xl font-bold font-primary">Admin Dashboard</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/avatars/admin.jpg" />
                <AvatarFallback className="bg-[#EFEEEA] text-[#161616] font-primary">AD</AvatarFallback>
              </Avatar>
              <Button 
                variant="outline" 
                className="border-[var(--color-secondary)] text-[#EFEEEA] hover:bg-[var(--color-secondary)]/10"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-[#1a1a1a] border-[#2a2a2a] hover:border-[var(--color-secondary)] transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-[#EFEEEA] font-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-[#EFEEEA] font-medium mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-[var(--color-secondary)]">
                    {stat.change}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="mb-8">
          <div className="flex space-x-1 rounded-lg bg-[#1a1a1a] p-1 border border-[#2a2a2a]">
            {['overview', 'invite-codes', 'attendance', 'leaderboard', 'users'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 capitalize ${
                  activeTab === tab
                    ? 'bg-[#EFEEEA] text-[#161616]'
                    : 'text-[var(--color-secondary)] hover:text-[#EFEEEA]'
                }`}
              >
                {tab.replace('-', ' ')}
              </button>
            ))}
          </div>
        </section>

        {/* Tab Content */}
        <section>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
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
                        <TableHead className="text-[#EFEEEA]">Name</TableHead>
                        <TableHead className="text-[#EFEEEA]">Class</TableHead>
                        <TableHead className="text-[#EFEEEA]">Branch</TableHead>
                        <TableHead className="text-[#EFEEEA]">Date</TableHead>
                        <TableHead className="text-[#EFEEEA]">Status</TableHead>
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
                                  ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                  : 'bg-red-500/20 text-red-400 border-red-500/30'
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

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
                  <CardHeader>
                    <CardTitle className="font-primary text-[#EFEEEA]">Top Performers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {leaderboardData.slice(0, 3).map((student) => (
                      <div key={student.rank} className="flex items-center justify-between py-3 border-b border-[#2a2a2a] last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#EFEEEA] text-[#161616] rounded-full flex items-center justify-center text-sm font-bold">
                            {student.rank}
                          </div>
                          <div>
                            <div className="text-[#EFEEEA] font-medium">{student.name}</div>
                            <div className="text-sm text-[var(--color-secondary)]">{student.class} • {student.branch}</div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-[#EFEEEA] text-[#161616]">
                          {student.attendance}/{student.total}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
                  <CardHeader>
                    <CardTitle className="font-primary text-[#EFEEEA]">Active Invite Codes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {inviteCodes.filter(code => code.isActive).map((code) => (
                      <div key={code.id} className="flex items-center justify-between py-3 border-b border-[#2a2a2a] last:border-0">
                        <div>
                          <div className="text-[#EFEEEA] font-medium">{code.code}</div>
                          <div className="text-sm text-[var(--color-secondary)]">Period: {code.period}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[#EFEEEA]">{code.uses}/{code.maxUses}</div>
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
              <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
                <CardHeader>
                  <CardTitle className="font-primary text-[#EFEEEA]">Generate New Invite Code</CardTitle>
                  <CardDescription className="text-[var(--color-secondary)]">
                    Create unique invite codes for different student periods
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <Input 
                      placeholder="Period (e.g., 2027)" 
                      value={newCode.period}
                      onChange={(e) => setNewCode({...newCode, period: e.target.value})}
                      className="bg-[#161616] border-[#2a2a2a] text-[#EFEEEA]"
                    />
                    <Input 
                      type="number"
                      placeholder="Max Uses" 
                      value={newCode.maxUses}
                      onChange={(e) => setNewCode({...newCode, maxUses: parseInt(e.target.value) || 50})}
                      className="bg-[#161616] border-[#2a2a2a] text-[#EFEEEA]"
                    />
                    <Button 
                      onClick={generateInviteCode}
                      className="bg-[#EFEEEA] text-[#161616] hover:bg-[#e0ded9]"
                    >
                      Generate Code
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
                <CardHeader>
                  <CardTitle className="font-primary text-[#EFEEEA]">Active Invite Codes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-[#2a2a2a]">
                        <TableHead className="text-[#EFEEEA]">Code</TableHead>
                        <TableHead className="text-[#EFEEEA]">Period</TableHead>
                        <TableHead className="text-[#EFEEEA]">Created</TableHead>
                        <TableHead className="text-[#EFEEEA]">Usage</TableHead>
                        <TableHead className="text-[#EFEEEA]">Status</TableHead>
                        <TableHead className="text-[#EFEEEA]">Actions</TableHead>
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
                                  ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                  : 'bg-red-500/20 text-red-400 border-red-500/30'
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
            <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="font-primary text-[#EFEEEA]">Attendance Records</CardTitle>
                <CardDescription className="text-[var(--color-secondary)]">
                  Weekly class attendance tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-32 bg-[#161616] border-[#2a2a2a] text-[#EFEEEA]">
                      <SelectValue placeholder="Branch" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-[#EFEEEA]">
                      <SelectItem value="all">All Branches</SelectItem>
                      <SelectItem value="programming">Programming</SelectItem>
                      <SelectItem value="uiux">UI/UX</SelectItem>
                      <SelectItem value="cybersecurity">Cyber Security</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input 
                    type="date" 
                    className="bg-[#161616] border-[#2a2a2a] text-[#EFEEEA] w-40"
                    defaultValue="2024-01-15"
                  />
                </div>
                <Table>
                  <TableHeader>
                    <TableRow className="border-[#2a2a2a]">
                      <TableHead className="text-[#EFEEEA]">Name</TableHead>
                      <TableHead className="text-[#EFEEEA]">Class</TableHead>
                      <TableHead className="text-[#EFEEEA]">Email</TableHead>
                      <TableHead className="text-[#EFEEEA]">Branch</TableHead>
                      <TableHead className="text-[#EFEEEA]">Date</TableHead>
                      <TableHead className="text-[#EFEEEA]">Status</TableHead>
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
                                ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                : 'bg-red-500/20 text-red-400 border-red-500/30'
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
              <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
                <CardHeader>
                  <CardTitle className="font-primary text-[#EFEEEA]">Student Leaderboard</CardTitle>
                  <CardDescription className="text-[var(--color-secondary)]">
                    Track attendance performance across different branches and years
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 mb-6">
                    <Select defaultValue="2024">
                      <SelectTrigger className="w-32 bg-[#161616] border-[#2a2a2a] text-[#EFEEEA]">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-[#EFEEEA]">
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-40 bg-[#161616] border-[#2a2a2a] text-[#EFEEEA]">
                        <SelectValue placeholder="Branch" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-[#EFEEEA]">
                        <SelectItem value="all">All Branches</SelectItem>
                        <SelectItem value="programming">Programming</SelectItem>
                        <SelectItem value="uiux">UI/UX</SelectItem>
                        <SelectItem value="cybersecurity">Cyber Security</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-4">
                    {leaderboardData.map((student) => (
                      <Card key={student.rank} className="bg-[#161616] border-[#2a2a2a] hover:border-[var(--color-secondary)] transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold font-primary ${
                                student.rank === 1 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                                student.rank === 2 ? 'bg-gray-400/20 text-gray-300 border border-gray-400/30' :
                                student.rank === 3 ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                                'bg-[#2a2a2a] text-[#EFEEEA] border border-[#2a2a2a]'
                              }`}>
                                {student.rank}
                              </div>
                              <div>
                                <div className="text-[#EFEEEA] font-bold text-lg font-primary">{student.name}</div>
                                <div className="text-[var(--color-secondary)]">{student.class} • {student.branch}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-[#EFEEEA] font-primary">
                                {student.attendance}<span className="text-lg text-[var(--color-secondary)]">/{student.total}</span>
                              </div>
                              <div className="text-[var(--color-secondary)]">sessions</div>
                            </div>
                          </div>
                          <div className="mt-4 w-full bg-[#2a2a2a] rounded-full h-2">
                            <div 
                              className="bg-[var(--color-secondary)] h-2 rounded-full transition-all duration-500"
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
            <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
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
                      <TableHead className="text-[#EFEEEA]">User</TableHead>
                      <TableHead className="text-[#EFEEEA]">Class</TableHead>
                      <TableHead className="text-[#EFEEEA]">Branch</TableHead>
                      <TableHead className="text-[#EFEEEA]">Period</TableHead>
                      <TableHead className="text-[#EFEEEA]">Join Date</TableHead>
                      <TableHead className="text-[#EFEEEA]">Status</TableHead>
                      <TableHead className="text-[#EFEEEA]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { id: 1, name: 'John Doe', class: '12A', branch: 'Programming', period: '2024', joinDate: '2024-01-10', status: 'Active' },
                      { id: 2, name: 'Sarah Smith', class: '11B', branch: 'UI/UX', period: '2024', joinDate: '2024-01-12', status: 'Active' },
                      { id: 3, name: 'Mike Johnson', class: '12C', branch: 'Cyber Security', period: '2024', joinDate: '2024-01-08', status: 'Inactive' },
                    ].map((user) => (
                      <TableRow key={user.id} className="border-[#2a2a2a]">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-[#EFEEEA] text-[#161616] font-primary">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-[#EFEEEA] font-medium">{user.name}</div>
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
                                ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                : 'bg-red-500/20 text-red-400 border-red-500/30'
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
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;