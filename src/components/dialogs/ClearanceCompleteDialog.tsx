import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ClearanceCompleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  billNo: string;
  onConfirm: (clearanceTime: string) => void;
}

export function ClearanceCompleteDialog({
  open,
  onOpenChange,
  billNo,
  onConfirm,
}: ClearanceCompleteDialogProps) {
  const [clearanceTime, setClearanceTime] = useState(() => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  });

  const handleConfirm = () => {
    if (!clearanceTime) return;
    onConfirm(clearanceTime);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">完成清关</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-[100px_1fr] items-center gap-4">
            <Label className="text-right">提单号</Label>
            <div className="font-medium">{billNo}</div>
          </div>
          <div className="grid grid-cols-[100px_1fr] items-center gap-4">
            <Label className="text-right">
              清关完成时间<span className="text-destructive">*</span>
            </Label>
            <Input
              type="datetime-local"
              value={clearanceTime}
              onChange={(e) => setClearanceTime(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button onClick={handleConfirm}>确认</Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            关闭
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
