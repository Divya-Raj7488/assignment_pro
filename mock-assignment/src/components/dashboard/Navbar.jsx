import {
  Search,
  Menu,
  ArrowDownNarrowWide,
  ArrowDownUp,
  ArrowDownWideNarrow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = ({ searchParam, setSearchParam }) => {
  return (
    <header className="border-b bg-background">
      <div className="flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-4">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="p-4 border-b">
                <h1 className="text-xl font-semibold">Dashboard</h1>
              </div>
              <nav className="flex-1 py-4">
                <div className="space-y-1 px-2">
                  {["Dashboard", "Content", "Analytics", "Settings"].map(
                    (item, index) => (
                      <Button
                        key={index}
                        variant={index === 1 ? "secondary" : "ghost"}
                        className="w-full justify-start"
                      >
                        {item}
                      </Button>
                    )
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          <h1 className="text-xl font-semibold hidden md:block">
            Content Management
          </h1>
        </div>

        <div className="relative max-w-sm">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full md:w-64 pl-8"
              value={searchParam}
              onChange={(e) => setSearchParam(e.target.value)}
            />
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <ArrowDownUp size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <span>
                <ArrowDownNarrowWide size={16} />
              </span>
              <span>Sort by word count (Increasing)</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>
                <ArrowDownWideNarrow size={16} />
              </span>
              <span>Sort by word count (Decreasing)</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>
                <ArrowDownNarrowWide size={16} />
              </span>
              <span>Date (Increasing)</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>
                <ArrowDownWideNarrow size={16} />
              </span>
              <span>Date (Decreasing)</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
