'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye,
  Mail,
  Phone,
  MapPin,
  Star
} from 'lucide-react';
import { mockSubmissions, ArtistSubmission } from '@/lib/mock-data';

export default function DashboardPage() {
  const [submissions, setSubmissions] = useState<ArtistSubmission[]>(mockSubmissions);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredSubmissions = submissions.filter(submission => 
    statusFilter === 'all' || submission.status === statusFilter
  );

  const updateStatus = (id: string, newStatus: 'approved' | 'rejected') => {
    setSubmissions(prev => 
      prev.map(submission => 
        submission.id === id 
          ? { ...submission, status: newStatus }
          : submission
      )
    );
    
    const submission = submissions.find(s => s.id === id);
    toast.success(`${submission?.name}'s application ${newStatus}`);
  };

  const stats = [
    {
      title: 'Total Applications',
      value: submissions.length,
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Pending Review',
      value: submissions.filter(s => s.status === 'pending').length,
      icon: Clock,
      color: 'text-yellow-600'
    },
    {
      title: 'Approved',
      value: submissions.filter(s => s.status === 'approved').length,
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      title: 'This Month',
      value: submissions.filter(s => {
        const date = new Date(s.submittedAt);
        const now = new Date();
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      }).length,
      icon: Calendar,
      color: 'text-purple-600'
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Artist Manager Dashboard</h1>
        <p className="text-muted-foreground">
          Manage artist applications and onboarding requests
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Submissions Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Artist Applications</CardTitle>
              <CardDescription>
                Review and manage artist onboarding applications
              </CardDescription>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Applications</SelectItem>
                <SelectItem value="pending">Pending Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Artist</TableHead>
                  <TableHead>Categories</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Price Range</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{submission.name}</div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {submission.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {submission.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {submission.category.slice(0, 2).map((cat) => (
                          <Badge key={cat} variant="outline" className="text-xs">
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </Badge>
                        ))}
                        {submission.category.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{submission.category.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        {submission.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {submission.priceRange === '0-25000' && '₹0-25K'}
                        {submission.priceRange === '25000-50000' && '₹25K-50K'}
                        {submission.priceRange === '50000-100000' && '₹50K-1L'}
                        {submission.priceRange === '100000-200000' && '₹1L-2L'}
                        {submission.priceRange === '200000+' && '₹2L+'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {formatDate(submission.submittedAt)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(submission.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {submission.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => updateStatus(submission.id, 'approved')}
                              className="h-8"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => updateStatus(submission.id, 'rejected')}
                              className="h-8"
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                        <Button size="sm" variant="outline" className="h-8">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredSubmissions.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No applications found for the selected filter.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}