import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputDemo() {
  return (
      <form action="">
          <div className="space-y-2">
              <Label htmlFor="input-02">
                  Required input <span className="text-destructive">*</span>
              </Label>
              <Input id="input-02" placeholder="Email" type="email" required />
          </div>
          <div className="mb-2 flex items-center justify-between gap-1">
              <Label htmlFor="input-04" className="leading-6">
                  Input with hint
              </Label>
              <span className="text-sm text-muted-foreground">Optional</span>
          </div>
          <Input id="input-04" placeholder="Email" type="email" />
      </form>
  );
}



