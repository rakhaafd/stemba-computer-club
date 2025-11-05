import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import { Trophy, Crown, Medal, Star, Filter, ChevronDown } from 'lucide-react';

const Leaderboard = () => {
  const [selectedYear, setSelectedYear] = useState<string>('2024');
  const [selectedField, setSelectedField] = useState<string>('all');
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isFieldOpen, setIsFieldOpen] = useState(false);

  // Data dummy untuk leaderboard (sama seperti sebelumnya)
  const mockLeaderboardData = [
    // ... data yang sama seperti sebelumnya
  ];

  const fields = [
    { value: 'all', label: 'All Fields' },
    { value: 'programming', label: 'Programming' },
    { value: 'cyber-security', label: 'Cyber Security' },
    { value: 'ui-ux', label: 'UI/UX Design' }
  ];

  const years = ['2024', '2023', '2022'];

  useEffect(() => {
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

  const getCurrentFieldLabel = () => {
    return fields.find(field => field.value === selectedField)?.label || 'All Fields';
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
                {/* Custom Year Select */}
                <div className="relative">
                  <button
                    onClick={() => setIsYearOpen(!isYearOpen)}
                    className="flex items-center justify-between w-full sm:w-32 px-3 py-2 bg-[#161616] border border-[#2a2a2a] rounded-md text-[#EFEEEA] hover:border-[var(--color-secondary)] transition-colors"
                  >
                    <span>{selectedYear}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {isYearOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md shadow-lg z-10">
                      {years.map(year => (
                        <button
                          key={year}
                          onClick={() => {
                            setSelectedYear(year);
                            setIsYearOpen(false);
                          }}
                          className={`w-full px-3 py-2 text-left hover:bg-[#2a2a2a] transition-colors ${
                            selectedYear === year ? 'bg-[var(--color-secondary)]/20 text-[var(--color-secondary)]' : 'text-[#EFEEEA]'
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
                    className="flex items-center justify-between w-full sm:w-48 px-3 py-2 bg-[#161616] border border-[#2a2a2a] rounded-md text-[#EFEEEA] hover:border-[var(--color-secondary)] transition-colors"
                  >
                    <span>{getCurrentFieldLabel()}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {isFieldOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md shadow-lg z-10">
                      {fields.map(field => (
                        <button
                          key={field.value}
                          onClick={() => {
                            setSelectedField(field.value);
                            setIsFieldOpen(false);
                          }}
                          className={`w-full px-3 py-2 text-left hover:bg-[#2a2a2a] transition-colors ${
                            selectedField === field.value ? 'bg-[var(--color-secondary)]/20 text-[var(--color-secondary)]' : 'text-[#EFEEEA]'
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