// import Link from "next/link";
import { Link } from "next-view-transitions";
import { ArrowUp, ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";

interface Transaction {
  title: string;
  category: string;
  type: string;
  status: string;
  date: string;
  amount: string;
}

const transactions: Transaction[] = [
  // {
  //   title: "تحصيل إيجار",
  //   category: "العمارة 172",
  //   type: "إيرادات",
  //   status: "موافق عليها",
  //   date: "2023-06-01",
  //   amount: "3000.00 جنيه",
  // },
  // {
  //   title: "تحصيل إيجار",
  //   category: "العمارة 180",
  //   type: "إيرادات",
  //   status: "موافق عليها",
  //   date: "2023-06-01",
  //   amount: "2500.00 جنيه",
  // },
  // {
  //   title: "مصروف صيانة",
  //   category: "العمارة 947",
  //   type: "مصروفات",
  //   status: "موافق عليها",
  //   date: "2023-06-10",
  //   amount: "800.00 جنيه",
  // },
  // {
  //   title: "مصروف تجديدات",
  //   category: "العمارة 172",
  //   type: "مصروفات",
  //   status: "موافق عليها",
  //   date: "2023-06-15",
  //   amount: "4500.00 جنيه",
  // },
  // {
  //   title: "تحصيل إيجار متأخر",
  //   category: "العمارة 180",
  //   type: "إيرادات",
  //   status: "مرفوضة",
  //   date: "2023-06-20",
  //   amount: "2600.00 جنيه",
  // },
  // {
  //   title: "مصروف كهرباء",
  //   category: "العمارة 947",
  //   type: "مصروفات",
  //   status: "موافق عليها",
  //   date: "2023-06-22",
  //   amount: "1100.00 جنيه",
  // },
];

export default function FinanceTransactions() {
  return (
    <Card className="col-span-4 overflow-x-auto">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>المعاملات المالية</CardTitle>
          <CardDescription>أحدث المعاملات المالية المسجلة.</CardDescription>
        </div>
        <Button asChild size="sm" className="ms-auto gap-1">
          <Link href="/transactions">
            عرض الكل
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>العملية</TableHead>
              <TableHead>المبلغ</TableHead>
              {/* <TableHead>الحالة</TableHead> */}
              <TableHead className="text-end">التاريخ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell className="flex items-center">
                  {transaction.type === "إيرادات" ? (
                    <div className="flex items-center text-green-500 me-1">
                      <ChevronUp className="w-4 h-4 text-green-500 me-2" />
                      {transaction.type}
                    </div>
                  ) : (
                    <div className="flex items-center text-red-500 me-1">
                      <ChevronDown className="w-4 h-4 text-red-500 me-2" />
                      {transaction.type}
                    </div>
                  )}
                  <Badge className="text-xs me-2" variant="secondary">
                    {transaction.category}
                  </Badge>
                  {transaction.title}
                </TableCell>
                <TableCell>{transaction.amount}</TableCell>
                {/* <TableCell>
                  <Badge className="text-xs font-normal" variant="outline">
                    {transaction.status === "موافق عليها" ? (
                      <CheckCircledIcon className="me-1 text-green-500" />
                    ) : (
                      <CrossCircledIcon className="me-1 text-red-500" />
                    )}
                    {transaction.status}
                  </Badge>
                </TableCell> */}
                <TableCell className="text-end">{transaction.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
