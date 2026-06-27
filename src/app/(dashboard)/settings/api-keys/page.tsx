"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Copy, Plus, Trash2, Eye, EyeOff, Key } from "lucide-react";
import { toast } from "sonner";

const mockKeys = [
  {
    id: "1",
    name: "Production",
    preview: "sk_prod...x8f2",
    createdAt: "2024-01-15",
    lastUsed: "2 hours ago",
    scopes: ["read", "write"],
  },
  {
    id: "2",
    name: "Development",
    preview: "sk_dev...a3b1",
    createdAt: "2024-02-20",
    lastUsed: "5 days ago",
    scopes: ["read"],
  },
];

export default function ApiKeysPage() {
  const [showKey, setShowKey] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [generatedKey, setGeneratedKey] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleGenerateKey() {
    // Mock key generation
    const key = `sk_${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`;
    setGeneratedKey(key);
  }

  function handleCopyKey() {
    navigator.clipboard.writeText(generatedKey);
    toast.success("API key copied to clipboard");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">API Keys</h1>
          <p className="text-muted-foreground">
            Manage your API keys for programmatic access
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger render={<Button />}>
              <Plus className="mr-2 h-4 w-4" />
              Create API Key
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {generatedKey ? "API Key Created" : "Create API Key"}
              </DialogTitle>
              <DialogDescription>
                {generatedKey
                  ? "Copy this key now. You won't be able to see it again."
                  : "Give your key a name to help identify it later."}
              </DialogDescription>
            </DialogHeader>
            {generatedKey ? (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg font-mono text-sm break-all">
                  {showKey ? generatedKey : "•".repeat(40)}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowKey(!showKey)}
                  >
                    {showKey ? (
                      <EyeOff className="mr-2 h-4 w-4" />
                    ) : (
                      <Eye className="mr-2 h-4 w-4" />
                    )}
                    {showKey ? "Hide" : "Show"}
                  </Button>
                  <Button size="sm" onClick={handleCopyKey}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="keyName">Key Name</Label>
                  <Input
                    id="keyName"
                    placeholder="e.g., Production, Development"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              {generatedKey ? (
                <Button onClick={() => { setDialogOpen(false); setGeneratedKey(""); setNewKeyName(""); }}>
                  Done
                </Button>
              ) : (
                <Button onClick={handleGenerateKey} disabled={!newKeyName}>
                  Generate Key
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Scopes</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockKeys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Key className="h-4 w-4 text-muted-foreground" />
                      {key.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {key.preview}
                    </code>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {key.scopes.map((scope) => (
                        <Badge key={scope} variant="secondary" className="text-xs">
                          {scope}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {key.createdAt}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {key.lastUsed}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4 text-destructive" />
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
