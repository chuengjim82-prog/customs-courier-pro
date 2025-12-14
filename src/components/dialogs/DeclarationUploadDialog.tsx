import { useState, useRef } from "react";
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

interface DeclarationUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  billNo: string;
  onUpload: (file: File) => void;
}

export function DeclarationUploadDialog({
  open,
  onOpenChange,
  billNo,
  onUpload,
}: DeclarationUploadDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      setSelectedFile(null);
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>回传报关单</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">提单号</Label>
            <div className="col-span-3">
              <Input value={billNo} readOnly className="bg-muted" />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">初步报关单</Label>
            <div className="col-span-3 flex gap-2">
              <Input
                value={selectedFile?.name || ""}
                placeholder="选择文件..."
                readOnly
                className="flex-1 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              />
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose}>
            关闭
          </Button>
          <Button onClick={handleUpload} disabled={!selectedFile}>
            上传
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
