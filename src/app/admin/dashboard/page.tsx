"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default function AdminDashboard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProfiles(data);
    }
    setLoading(false);
  };

  const updateResumeStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("profiles")
      .update({ resume_status: status })
      .eq("id", id);
      
    if (!error) {
      fetchProfiles(); // Refresh
    }
  };

  if (loading) return <div className="p-8 text-center text-muted-foreground">Loading dashboard...</div>;

  const totalPaid = profiles.filter(p => p.payment_status === 'paid').length;
  const totalPending = profiles.filter(p => p.payment_status === 'pending').length;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Submissions</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="text-3xl font-bold">{profiles.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Paid Customers</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="text-3xl font-bold text-emerald-500">{totalPaid}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Payment</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="text-3xl font-bold text-amber-500">{totalPending}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
                <tr>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Payment</th>
                  <th className="px-4 py-3">Resume Status</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {profiles.map((profile) => (
                  <tr key={profile.id} className="border-b hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <p className="font-semibold">{profile.name}</p>
                      <p className="text-xs text-muted-foreground">{profile.email}</p>
                    </td>
                    <td className="px-4 py-3 font-medium">{profile.target_role}</td>
                    <td className="px-4 py-3">
                      <Badge variant={profile.payment_status === 'paid' ? "default" : "secondary"}
                             className={profile.payment_status === 'paid' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : ""}>
                         {profile.payment_status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline">
                        {profile.resume_status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {profile.created_at ? format(new Date(profile.created_at), 'MMM dd, yyyy') : 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                       {profile.resume_status !== 'done' && profile.payment_status === 'paid' && (
                         <Button size="sm" onClick={() => updateResumeStatus(profile.id, 'done')}>Mark Done</Button>
                       )}
                       <Button variant="outline" size="sm">View Data</Button>
                    </td>
                  </tr>
                ))}
                {profiles.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No submissions yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
