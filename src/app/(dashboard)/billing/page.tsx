"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, CreditCard, Download, ExternalLink } from "lucide-react";

const currentPlan = {
  name: "Pro",
  price: 29,
  period: "month",
  features: [
    "Up to 5 team members",
    "50,000 API calls/month",
    "Advanced analytics",
    "Priority support",
    "Custom webhooks",
    "API access",
  ],
};

const usage = {
  teamMembers: { current: 3, max: 5 },
  apiCalls: { current: 23456, max: 50000 },
};

const invoices = [
  { id: "INV-001", date: "Jun 1, 2024", amount: "$29.00", status: "Paid" },
  { id: "INV-002", date: "May 1, 2024", amount: "$29.00", status: "Paid" },
  { id: "INV-003", date: "Apr 1, 2024", amount: "$29.00", status: "Paid" },
  { id: "INV-004", date: "Mar 1, 2024", amount: "$29.00", status: "Paid" },
];

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="text-muted-foreground">
          Manage your subscription and billing
        </p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>
                You are currently on the {currentPlan.name} plan
              </CardDescription>
            </div>
            <Badge className="text-lg px-4 py-1">{currentPlan.name}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold">${currentPlan.price}</span>
            <span className="text-muted-foreground">/{currentPlan.period}</span>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {currentPlan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
          <div className="flex gap-3">
            <Button>Upgrade Plan</Button>
            <Button variant="outline">Manage Subscription</Button>
          </div>
        </CardContent>
      </Card>

      {/* Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Usage</CardTitle>
          <CardDescription>Your current billing period usage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Team Members</span>
              <span>
                {usage.teamMembers.current} / {usage.teamMembers.max}
              </span>
            </div>
            <Progress
              value={(usage.teamMembers.current / usage.teamMembers.max) * 100}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>API Calls</span>
              <span>
                {usage.apiCalls.current.toLocaleString()} /{" "}
                {usage.apiCalls.max.toLocaleString()}
              </span>
            </div>
            <Progress
              value={(usage.apiCalls.current / usage.apiCalls.max) * 100}
            />
          </div>
        </CardContent>
      </Card>

      {/* Invoices */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>Your billing history</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download All
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{invoice.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
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
}
