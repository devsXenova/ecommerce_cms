import { useState } from 'react';
import { format, subDays } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { Users, UserPlus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCustomersReport } from '../hooks/useReports';
import { DateRangeFilter } from './DateRangeFilter';
import { formatCurrency } from '@/lib/utils';

export function CustomersReport() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  const statsCardClass =
    'border-border bg-[linear-gradient(145deg,rgb(var(--card))_0%,rgb(var(--muted))_100%)] shadow-elegant';

  const { data, isLoading } = useCustomersReport({
    startDate: dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : '',
    endDate: dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : '',
  });

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Loading customers data...</div>;
  }

  if (!data) {
    return <div className="text-center p-8 text-muted-foreground">No data available</div>;
  }

  return (
    <div className="space-y-6">
      <DateRangeFilter
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        className="max-w-sm"
      />

      <Card className={statsCardClass}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
          <Users className="h-4 w-4 text-sage-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-card-foreground">{data.totalCustomers}</div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <Users className="h-5 w-5 text-gold-600" />
            Top Customers
          </CardTitle>
          <CardDescription>Customers with highest spending in selected period</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="text-right">Orders</TableHead>
                <TableHead className="text-right">Total Spent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.topCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-muted-foreground">{customer.email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{customer.totalOrders}</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(customer.totalSpent)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="border-border bg-card shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <UserPlus className="h-5 w-5 text-gold-600" />
            New Customers
          </CardTitle>
          <CardDescription>Recently registered customers in selected period</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>First Order</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.newCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-muted-foreground">{customer.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {format(new Date(customer.registrationDate), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell>
                    {customer.firstOrderDate
                      ? format(new Date(customer.firstOrderDate), 'MMM dd, yyyy')
                      : 'No orders yet'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
