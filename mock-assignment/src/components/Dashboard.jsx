import { useState } from "react";
import {
  Search,
  Menu,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./dashboard/Sidebar";
import Navbar from "./dashboard/navbar";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Mock data for the table
  const tableData = [
    {
      id: 1,
      title: "Getting Started with React",
      keywords: ["React", "JavaScript", "Frontend"],
      wordCount: 1250,
      createdOn: "2025-05-01",
      status: "Draft",
    },
    {
      id: 2,
      title: "Advanced CSS Techniques",
      keywords: ["CSS", "Animation", "Design"],
      wordCount: 980,
      createdOn: "2025-05-05",
      status: "Published",
    },
    {
      id: 3,
      title: "Introduction to TypeScript",
      keywords: ["TypeScript", "JavaScript", "Programming"],
      wordCount: 1520,
      createdOn: "2025-05-08",
      status: "Draft",
    },
    {
      id: 4,
      title: "Responsive Web Design",
      keywords: ["CSS", "Mobile", "Responsive"],
      wordCount: 1100,
      createdOn: "2025-05-10",
      status: "Published",
    },
    {
      id: 5,
      title: "Working with REST APIs",
      keywords: ["API", "REST", "Backend"],
      wordCount: 1340,
      createdOn: "2025-05-12",
      status: "Draft",
    },
  ];
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <Navbar />

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Card>
            <CardHeader className="flex flex-col items-center md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0 pb-6">
              <CardTitle>Your Content</CardTitle>
              <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Filter by keyword..."
                    className="pl-8 w-full"
                  />
                </div>
                {/* <Button>Add New</Button> */}
              </div>
            </CardHeader>
            <CardContent>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Keywords</TableHead>
                      <TableHead>Word Count</TableHead>
                      <TableHead>Created On</TableHead>
                      <TableHead>Actions</TableHead>
                      <TableHead>Publish</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tableData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.title}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {item.keywords.map((keyword, idx) => (
                              <Badge key={idx} variant="secondary">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{item.wordCount}</TableCell>
                        <TableCell>{item.createdOn}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Preview</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant={
                              item.status === "Published"
                                ? "outline"
                                : "default"
                            }
                            size="sm"
                          >
                            {item.status === "Published"
                              ? "Published"
                              : "Publish"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card View */}
              <div className="grid gap-4 md:hidden">
                {tableData.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {item.createdOn} · {item.wordCount} words
                            </p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Preview</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {item.keywords.map((keyword, idx) => (
                            <Badge key={idx} variant="secondary">
                              {keyword}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex justify-end">
                          <Button
                            variant={
                              item.status === "Published"
                                ? "outline"
                                : "default"
                            }
                            size="sm"
                          >
                            {item.status === "Published"
                              ? "Published"
                              : "Publish"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationPrevious href="#" />
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationContent>
                </Pagination>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
