import { Search, MoreHorizontal } from "lucide-react";
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
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const ContentTable = ({ tableData, filterParam, setFilterParam }) => {
  const [currentDataInPreview, setCurrentDataInPreview] = useState(
    tableData.slice(0, 4)
  );
  const [currentIdInPreview, setCurrentIdInPreview] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // setCurrentIdInPreview((prev) => {
    //   const newIndex = prev + 5;
    //   setCurrentDataInPreview(() => {
    //     return tableData.slice(newIndex, newIndex + 4);
    //   });
    //   return newIndex;
    // });
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    setCurrentDataInPreview(() => {
      return tableData.slice(0, 4);
    });
  }, [tableData]);

  useEffect(() => {
    console.log("currentIdInPreview", currentIdInPreview);
  }, [currentIdInPreview]);

  const nextPage = () => {
    setCurrentIdInPreview((prev) => {
      const newIndex = prev + 5;
      setCurrentDataInPreview(() => {
        return tableData.slice(newIndex, newIndex + 4);
      });
      return newIndex;
    });
  };

  const previousPage = () => {
    setCurrentIdInPreview((prev) => {
      const newIndex = prev - 5;
      setCurrentDataInPreview(() => {
        return tableData.slice(newIndex, newIndex + 4);
      });
      return newIndex;
    });
  };

  if (isLoading) {
    return (
      <main className="flex-1 overflow-auto p-4 md:p-6 flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </main>
    );
  } else {
    return (
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
                  value={filterParam}
                  onChange={(e) => setFilterParam(e.target.value)}
                />
              </div>
              {/* <Button>Add New</Button> */}
            </div>
          </CardHeader>
          <CardContent>
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
                  {currentDataInPreview.slice(0, 4).map((item) => (
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
                            item.status === "Published" ? "outline" : "default"
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
            <div className="grid gap-4 md:hidden">
              {currentDataInPreview.slice(0, 4).map((item) => (
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
                            item.status === "Published" ? "outline" : "default"
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
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  {currentIdInPreview / 5 > 1 && (
                    <PaginationPrevious href="#" onClick={previousPage} />
                  )}
                  {currentIdInPreview / 5 >= 1 && (
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        {currentIdInPreview / 5}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  {currentIdInPreview < tableData.length && (
                    <PaginationItem>
                      <PaginationLink href="#">
                        {" "}
                        {currentIdInPreview / 5 + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {currentIdInPreview < tableData.length && (
                    <PaginationNext href="#" onClick={nextPage} />
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }
};

export default ContentTable;
