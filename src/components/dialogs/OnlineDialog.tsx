import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface OnlineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  billNo: string;
  onConfirm: (onlineTime: string) => void;
}

export function OnlineDialog({
  open,
  onOpenChange,
  billNo,
  onConfirm,
}: OnlineDialogProps) {
  const [onlineTime, setOnlineTime] = useState(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  });

  const handleConfirm = () => {
    onConfirm(onlineTime);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>上网操作</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">提单号码</Label>
            <div className="col-span-3">
              <Input value={billNo} readOnly className="bg-muted" />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              海关上网<span className="text-destructive">*</span>
            </Label>
            <div className="col-span-3">
              <Input
                type="datetime-local"
                value={onlineTime}
                onChange={(e) => setOnlineTime(e.target.value)}
              />
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            关闭
          </Button>
          <Button onClick={handleConfirm}>确认</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
