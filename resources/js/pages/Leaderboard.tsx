import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';
import { Button } from '@components/ui/button';
import { Trophy, Crown, Medal, Star, Filter } from 'lucide-react';

const Leaderboard = () => {
  const [selectedYear, setSelectedYear] = useState<string>('2024');
  const [selectedField, setSelectedField] = useState<string>('all');
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Data dummy untuk leaderboard
  const mockLeaderboardData = [
    {
      id: 1,
      name: "Alex Chen",
      avatar: "/avatars/alex.jpg",
      initial: "AC",
      field: "programming",
      attendance: 95,
      points: 1250,
      rank: 1,
      projects: 8,
      joinedYear: 2023
    },
    {
      id: 2,
      name: "Sarah Kim",
      avatar: "/avatars/sarah.jpg",
      initial: "SK",
      field: "cyber-security",
      attendance: 92,
      points: 1180,
      rank: 2,
      projects: 7,
      joinedYear: 2023
    },
    {
      id: 3,
      name: "Mike Rodriguez",
      avatar: "/avatars/mike.jpg",
      initial: "MR",
      field: "ui-ux",
      attendance: 88,
      points: 1050,
      rank: 3,
      projects: 6,
      joinedYear: 2024
    },
    {
      id: 4,
      name: "Emily Wang",
      avatar: "/avatars/emily.jpg",
      initial: "EW",
      field: "programming",
      attendance: 85,
      points: 980,
      rank: 4,
      projects: 5,
      joinedYear: 2023
    },
    {
      id: 5,
      name: "James Wilson",
      avatar: "/avatars/james.jpg",
      initial: "JW",
      field: "cyber-security",
      attendance: 82,
      points: 920,
      rank: 5,
      projects: 4,
      joinedYear: 2024
    },
    {
      id: 6,
      name: "Lisa Park",
      avatar: "/avatars/lisa.jpg",
      initial: "LP",
      field: "ui-ux",
      attendance: 80,
      points: 880,
      rank: 6,
      projects: 5,
      joinedYear: 2023
    },
    {
      id: 7,
      name: "David Kumar",
      avatar: "/avatars/david.jpg",
      initial: "DK",
      field: "programming",
      attendance: 78,
      points: 850,
      rank: 7,
      projects: 4,
      joinedYear: 2024
    },
    {
      id: 8,
      name: "Maria Gonzalez",
      avatar: "/avatars/maria.jpg",
      initial: "MG",
      field: "cyber-security",
      attendance: 75,
      points: 820,
      rank: 8,
      projects: 3,
      joinedYear: 2023
    },
    {
      id: 9,
      name: "Tom Hanks",
      avatar: "/avatars/tom.jpg",
      initial: "TH",
      field: "ui-ux",
      attendance: 72,
      points: 780,
      rank: 9,
      projects: 3,
      joinedYear: 2024
    },
    {
      id: 10,
      name: "Anna Lee",
      avatar: "/avatars/anna.jpg",
      initial: "AL",
      field: "programming",
      attendance: 70,
      points: 750,
      rank: 10,
      projects: 2,
      joinedYear: 2024
    }
  ];

  const fields = [
    { value: 'all', label: 'All Fields' },
    { value: 'programming', label: 'Programming' },
    { value: 'cyber-security', label: 'Cyber Security' },
    { value: 'ui-ux', label: 'UI/UX Design' }
  ];

  const years = ['2024', '2023', '2022'];

  useEffect(() => {
    // Simulasi loading data
    setIsLoading(true);
    const timer = setTimeout(() => {
      const filteredData = mockLeaderboardData
        .filter(member => 
          (selectedField === 'all' || member.field === selectedField) &&
          member.joinedYear <= parseInt(selectedYear)
        )
        .sort((a, b) => b.points - a.points)
        .map((member, index) => ({
          ...member,
          rank: index + 1
        }));
      
      setLeaderboardData(filteredData);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [selectedYear, selectedField]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500 fill-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400 fill-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-700 fill-amber-700" />;
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

  return (
    <div className="min-h-screen bg-[#161616] text-[#EFEEEA] py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h1 className="text-4xl font-bold font-primary">Leaderboard</h1>
          </div>
          <p className="text-xl text-[var(--color-secondary)] max-w-2xl mx-auto">
            Track member activity and attendance across different fields. Recognize our most dedicated members!
          </p>
        </div>

        {/* Filters */}
        <Card className="bg-[#1a1a1a] border-[#2a2a2a] mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-[var(--color-secondary)]" />
                <span className="text-[#EFEEEA] font-medium">Filters:</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-full sm:w-32 bg-[#161616] border-[#2a2a2a] text-[#EFEEEA]">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-[#EFEEEA]">
                    {years.map(year => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedField} onValueChange={setSelectedField}>
                  <SelectTrigger className="w-full sm:w-48 bg-[#161616] border-[#2a2a2a] text-[#EFEEEA]">
                    <SelectValue placeholder="Select Field" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-[#EFEEEA]">
                    {fields.map(field => (
                      <SelectItem key={field.value} value={field.value}>
                        {field.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

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

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-yellow-500 font-primary mb-2">
                {leaderboardData.find(m => m.rank === 1)?.name || '-'}
              </div>
              <div className="text-[var(--color-secondary)]">Top Performer</div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-400 font-primary mb-2">
                {Math.round(leaderboardData.reduce((acc, curr) => acc + curr.attendance, 0) / leaderboardData.length) || 0}%
              </div>
              <div className="text-[var(--color-secondary)]">Average Attendance</div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-400 font-primary mb-2">
                {leaderboardData.length}
              </div>
              <div className="text-[var(--color-secondary)]">Active Members</div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard Table */}
        <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="font-primary text-[#EFEEEA] flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Member Rankings
            </CardTitle>
            <CardDescription className="text-[var(--color-secondary)]">
              Sorted by total points and attendance performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-secondary)] mx-auto"></div>
                <p className="text-[var(--color-secondary)] mt-4">Loading leaderboard data...</p>
              </div>
            ) : leaderboardData.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-[var(--color-secondary)]">No members found for the selected filters.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {leaderboardData.map((member) => (
                  <div
                    key={member.id}
                    className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 ${
                      member.rank <= 3 
                        ? 'bg-gradient-to-r from-[#2a2a2a] to-[#1a1a1a] border-yellow-500/30 shadow-lg' 
                        : 'bg-[#161616] border-[#2a2a2a] hover:border-[var(--color-secondary)]'
                    }`}
                  >
                    {/* Rank */}
                    <div className="flex items-center justify-center w-12 h-12">
                      {getRankIcon(member.rank)}
                    </div>

                    {/* Avatar and Name */}
                    <div className="flex items-center gap-4 flex-1">
                      <Avatar className="w-12 h-12 border-2 border-[#2a2a2a]">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-[#EFEEEA] text-[#161616] font-primary">
                          {member.initial}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-bold text-[#EFEEEA] font-primary">
                          {member.name}
                          {member.rank <= 3 && (
                            <Star className="w-4 h-4 text-yellow-500 inline-block ml-2" />
                          )}
                        </h3>
                        <Badge 
                          variant="secondary" 
                          className={`mt-1 border ${getFieldColor(member.field)}`}
                        >
                          {getFieldLabel(member.field)}
                        </Badge>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="hidden md:flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="text-[var(--color-secondary)]">Attendance</div>
                        <div className={`font-bold ${getAttendanceColor(member.attendance)}`}>
                          {member.attendance}%
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-[var(--color-secondary)]">Projects</div>
                        <div className="font-bold text-[#EFEEEA]">{member.projects}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[var(--color-secondary)]">Points</div>
                        <div className="font-bold text-[#EFEEEA]">{member.points}</div>
                      </div>
                    </div>

                    {/* Mobile Stats */}
                    <div className="flex md:hidden items-center gap-4">
                      <div className="text-center">
                        <div className="text-xs text-[var(--color-secondary)]">Attend</div>
                        <div className={`text-sm font-bold ${getAttendanceColor(member.attendance)}`}>
                          {member.attendance}%
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-[var(--color-secondary)]">Points</div>
                        <div className="text-sm font-bold text-[#EFEEEA]">{member.points}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Legend */}
        <Card className="bg-[#1a1a1a] border-[#2a2a2a] mt-8">
          <CardContent className="p-6">
            <h3 className="font-bold text-[#EFEEEA] mb-4 font-primary">How Points are Calculated</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[var(--color-secondary)]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Attendance (90-100%): 20 points per session</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Attendance (80-89%): 15 points per session</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>Attendance (70-79%): 10 points per session</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Attendance (below 70%): 5 points per session</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Project Completion: 100 points per project</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>Special Contributions: 50 points each</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;