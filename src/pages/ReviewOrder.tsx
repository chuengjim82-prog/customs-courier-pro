import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { X, Save, CheckCircle, Upload, Trash2, Plus } from "lucide-react";

interface Attachment {
  id: string;
  type: string;
  fileName: string;
  reviewResult: "passed" | "failed" | "";
  remark: string;
  reviewDate: string;
  reviewer: string;
}

interface ReceivableItem {
  id: string;
  category: string;
  itemName: string;
  method: string;
  price: number;
  currency: string;
  unit: string;
  quantity: number;
  amount: number;
  remark: string;
}

interface ContainerInfo {
  id: string;
  containerNo: string;
  goodsDesc: string;
  quantity: number;
  weight: number;
  containerType: string;
}

interface InvoiceProduct {
  id: string;
  productName: string;
  hsCode: string;
  model: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  saberFile: string;
}

export default function ReviewOrder() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [attachments, setAttachments] = useState<Attachment[]>([
    { id: "1", type: "提单文件", fileName: "td.pdf", reviewResult: "passed", remark: "", reviewDate: "2025/11/22", reviewer: "steven" },
    { id: "2", type: "装箱单", fileName: "z.pdf", reviewResult: "passed", remark: "", reviewDate: "2025/11/22", reviewer: "steven" },
    { id: "3", type: "发票", fileName: "f.pdf", reviewResult: "failed", remark: "申报金额过低", reviewDate: "2025/11/22", reviewer: "steven" },
    { id: "4", type: "SABER", fileName: "a.pdf;b.pdf", reviewResult: "passed", remark: "", reviewDate: "2025/11/22", reviewer: "steven" },
    { id: "5", type: "清关授权函", fileName: "qgsqh.pdf", reviewResult: "passed", remark: "", reviewDate: "2025/11/22", reviewer: "steven" },
    { id: "6", type: "船司授权函", fileName: "cssqh.pdf", reviewResult: "passed", remark: "", reviewDate: "2025/11/22", reviewer: "steven" },
  ]);

  const [receivables, setReceivables] = useState<ReceivableItem[]>([
    { id: "1", category: "集装箱", itemName: "港口费", method: "固定", price: 100, currency: "SAR", unit: "柜", quantity: 1, amount: 100, remark: "" },
    { id: "2", category: "", itemName: "港口操作", method: "固定", price: 100, currency: "SAR", unit: "柜", quantity: 1, amount: 100, remark: "" },
    { id: "3", category: "", itemName: "查验费", method: "实报", price: 100, currency: "SAR", unit: "柜", quantity: 1, amount: 100, remark: "" },
  ]);

  const [containers, setContainers] = useState<ContainerInfo[]>([
    { id: "1", containerNo: "ECMU 85823", goodsDesc: "Other anionic organic surface-", quantity: 4870, weight: 23289, containerType: "40尺标准柜" },
    { id: "2", containerNo: "TCKU 6311253", goodsDesc: "Other anionic organic surface-", quantity: 2898, weight: 28700, containerType: "40尺标准柜" },
  ]);

  const [invoiceProducts, setInvoiceProducts] = useState<InvoiceProduct[]>([
    { id: "1", productName: "衣架", hsCode: "HScode1", model: "衣架", quantity: 461, unitPrice: 5.57, totalPrice: 2567.77, saberFile: "无" },
    { id: "2", productName: "箱子", hsCode: "HSCode2", model: "箱子", quantity: 40, unitPrice: 4.25, totalPrice: 170, saberFile: "SABER1" },
  ]);

  const handleReviewResultChange = (id: string, result: "passed" | "failed") => {
    setAttachments(attachments.map(a => 
      a.id === id ? { ...a, reviewResult: result, reviewDate: new Date().toLocaleDateString(), reviewer: "当前用户" } : a
    ));
  };

  const handleRemarkChange = (id: string, remark: string) => {
    setAttachments(attachments.map(a => 
      a.id === id ? { ...a, remark } : a
    ));
  };

  const addReceivable = () => {
    const newItem: ReceivableItem = {
      id: Date.now().toString(),
      category: "",
      itemName: "",
      method: "固定",
      price: 0,
      currency: "SAR",
      unit: "柜",
      quantity: 1,
      amount: 0,
      remark: "",
    };
    setReceivables([...receivables, newItem]);
  };

  const removeReceivable = (id: string) => {
    setReceivables(receivables.filter(r => r.id !== id));
  };

  const totalInvoice = invoiceProducts.reduce((sum, p) => sum + p.totalPrice, 0);

  return (
    <MainLayout title="审核资料">
      <div className="space-y-4">
        {/* Header Buttons */}
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
            <X className="w-4 h-4 mr-1" />
            关闭
          </Button>
          <Button variant="outline" size="sm">
            <Save className="w-4 h-4 mr-1" />
            保存
          </Button>
          <Button size="sm" className="bg-status-completed hover:bg-status-completed/90">
            <CheckCircle className="w-4 h-4 mr-1" />
            完成审核并提交
          </Button>
        </div>

        {/* 订单信息 */}
        <div className="bg-card rounded-lg border p-4">
          <h3 className="text-base font-semibold mb-4 text-primary border-b pb-2">订单信息</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-right">客户名称<span className="text-destructive">*</span></Label>
              <Input className="col-span-2" defaultValue="客户1" />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-right">出口国家<span className="text-destructive">*</span></Label>
              <Input className="col-span-2" defaultValue="CN" />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-right">出口公司<span className="text-destructive">*</span></Label>
              <Input className="col-span-2" defaultValue="出口公司1" />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-right">进口国家<span className="text-destructive">*</span></Label>
              <Input className="col-span-2" defaultValue="SA" />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-right">目的城市<span className="text-destructive">*</span></Label>
              <Input className="col-span-2" defaultValue="达曼" />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-right">目的港口<span className="text-destructive">*</span></Label>
              <Input className="col-span-2" defaultValue="达曼港" />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-right">目的地海关<span className="text-destructive">*</span></Label>
              <Input className="col-span-2" defaultValue="达曼海关" />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-right">支付方式<span className="text-destructive">*</span></Label>
              <Select defaultValue="bank">
                <SelectTrigger className="col-span-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank">银行转账</SelectItem>
                  <SelectItem value="guarantee">保涵</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-right">代理清关<span className="text-destructive">*</span></Label>
              <Select defaultValue="yes">
                <SelectTrigger className="col-span-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">是</SelectItem>
                  <SelectItem value="no">否</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-right">清关公司<span className="text-destructive">*</span></Label>
              <Input className="col-span-2" />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-right">经纪商授权码<span className="text-destructive">*</span></Label>
              <Input className="col-span-2" />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-right">申报类型<span className="text-destructive">*</span></Label>
              <Select defaultValue="import">
                <SelectTrigger className="col-span-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="import">进口申报</SelectItem>
                  <SelectItem value="immediate">立即清关（1万SAR）</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 grid grid-cols-6 items-start gap-2">
              <Label className="text-right pt-2">备注</Label>
              <Textarea className="col-span-5" rows={2} />
            </div>
          </div>
        </div>

        {/* 附件(清关) */}
        <div className="bg-card rounded-lg border p-4">
          <h3 className="text-base font-semibold mb-4 text-primary border-b pb-2">附件(清关)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-2 font-medium">类型</th>
                  <th className="text-left p-2 font-medium">文件名</th>
                  <th className="text-center p-2 font-medium">上传</th>
                  <th className="text-center p-2 font-medium">审核结果</th>
                  <th className="text-left p-2 font-medium">备注</th>
                  <th className="text-center p-2 font-medium">审核日期</th>
                  <th className="text-center p-2 font-medium">审核人</th>
                </tr>
              </thead>
              <tbody>
                {attachments.map((att) => (
                  <tr key={att.id} className="border-b">
                    <td className="p-2 font-medium">{att.type}</td>
                    <td className="p-2">
                      <a href="#" className="text-primary hover:underline">{att.fileName}</a>
                    </td>
                    <td className="p-2 text-center">
                      <Button variant="outline" size="sm">
                        <Upload className="w-3 h-3 mr-1" />
                        上传
                      </Button>
                    </td>
                    <td className="p-2">
                      <RadioGroup
                        value={att.reviewResult}
                        onValueChange={(v) => handleReviewResultChange(att.id, v as "passed" | "failed")}
                        className="flex justify-center gap-4"
                      >
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="passed" id={`passed-${att.id}`} />
                          <Label htmlFor={`passed-${att.id}`} className="text-xs text-status-completed cursor-pointer">通过</Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="failed" id={`failed-${att.id}`} />
                          <Label htmlFor={`failed-${att.id}`} className="text-xs text-destructive cursor-pointer">未通过</Label>
                        </div>
                      </RadioGroup>
                    </td>
                    <td className="p-2">
                      <Input 
                        className="h-7 text-xs" 
                        value={att.remark}
                        onChange={(e) => handleRemarkChange(att.id, e.target.value)}
                        placeholder={att.reviewResult === "failed" ? "请填写原因" : ""}
                      />
                    </td>
                    <td className="p-2 text-center text-muted-foreground">{att.reviewDate}</td>
                    <td className="p-2 text-center text-muted-foreground">{att.reviewer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-3">
            <Button variant="outline" size="sm">
              <Plus className="w-3 h-3 mr-1" />
              上传附件
            </Button>
            <Button size="sm">保存</Button>
          </div>
        </div>

        {/* 应收项目 */}
        <div className="bg-card rounded-lg border p-4">
          <h3 className="text-base font-semibold mb-4 text-primary border-b pb-2">应收项目</h3>
          <div className="mb-4 flex items-center gap-2">
            <Label>选择销售报价<span className="text-destructive">*</span></Label>
            <Select defaultValue="quote1">
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quote1">客户1 报价1</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-2 font-medium">类别</th>
                  <th className="text-left p-2 font-medium">项目名称<span className="text-destructive">*</span></th>
                  <th className="text-left p-2 font-medium">方式<span className="text-destructive">*</span></th>
                  <th className="text-right p-2 font-medium">价格<span className="text-destructive">*</span></th>
                  <th className="text-left p-2 font-medium">币种<span className="text-destructive">*</span></th>
                  <th className="text-left p-2 font-medium">单位<span className="text-destructive">*</span></th>
                  <th className="text-right p-2 font-medium">数量<span className="text-destructive">*</span></th>
                  <th className="text-right p-2 font-medium">金额<span className="text-destructive">*</span></th>
                  <th className="text-left p-2 font-medium">备注</th>
                  <th className="text-center p-2 font-medium">操作</th>
                </tr>
              </thead>
              <tbody>
                {receivables.map((item, index) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-2">{item.category || (index === 0 ? "" : "")}</td>
                    <td className="p-2">{item.itemName}</td>
                    <td className="p-2">{item.method}</td>
                    <td className="p-2 text-right">{item.price}</td>
                    <td className="p-2">{item.currency}</td>
                    <td className="p-2">{item.unit}</td>
                    <td className="p-2 text-right">{item.quantity}</td>
                    <td className="p-2 text-right">{item.amount}</td>
                    <td className="p-2">{item.remark}</td>
                    <td className="p-2 text-center">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive hover:text-destructive"
                        onClick={() => removeReceivable(item.id)}
                      >
                        删除
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-3">
            <Button variant="outline" size="sm" onClick={addReceivable}>
              <Plus className="w-3 h-3 mr-1" />
              添加收入项
            </Button>
            <Button size="sm">保存</Button>
          </div>
        </div>

        {/* 提单信息 */}
        <div className="bg-card rounded-lg border p-4">
          <h3 className="text-base font-semibold mb-4 text-primary border-b pb-2">提单信息</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-medium mb-2">发件人<span className="text-destructive">*</span></h4>
              <div className="space-y-2">
                <div className="grid grid-cols-4 items-center gap-2">
                  <Label className="text-right text-xs">发货人名称<span className="text-destructive">*</span></Label>
                  <Input className="col-span-3 h-8" defaultValue="SHENZHEN CHUANGGONG IMP&EXP CO. LTD" />
                </div>
                <div className="grid grid-cols-4 items-center gap-2">
                  <Label className="text-right text-xs">发货联系人</Label>
                  <Input className="col-span-1 h-8" />
                  <Label className="text-right text-xs">电话</Label>
                  <Input className="col-span-1 h-8" />
                </div>
                <div className="grid grid-cols-4 items-center gap-2">
                  <Label className="text-right text-xs">发货人地址</Label>
                  <Input className="col-span-3 h-8" defaultValue="24E SHENGANG GARDEN SHENNAN EAST ROAD HUANGBEI STREET LUOHU" />
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">收件人<span className="text-destructive">*</span></h4>
              <div className="space-y-2">
                <div className="grid grid-cols-4 items-center gap-2">
                  <Label className="text-right text-xs">收件人名称<span className="text-destructive">*</span></Label>
                  <Input className="col-span-3 h-8" defaultValue="HANA HUSSAIN SAEED ALZAHRA【CHUANGGONG IMP】" />
                </div>
                <div className="grid grid-cols-4 items-center gap-2">
                  <Label className="text-right text-xs">收件联系人</Label>
                  <Input className="col-span-1 h-8" />
                  <Label className="text-right text-xs">电话</Label>
                  <Input className="col-span-1 h-8" />
                </div>
                <div className="grid grid-cols-4 items-center gap-2">
                  <Label className="text-right text-xs">收件人地址</Label>
                  <Input className="col-span-3 h-8" defaultValue="BUILDING NO.4166,FALASTEEN STREET,AL HAMRA DISTRICT,JEDDAH CITY,SAUDI ARABIA" />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">BL提单信息</h4>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="grid grid-cols-2 items-center gap-2">
                <Label className="text-right text-xs">提单号<span className="text-destructive">*</span></Label>
                <Input className="h-8" />
              </div>
              <div className="grid grid-cols-2 items-center gap-2">
                <Label className="text-right text-xs">提单日期</Label>
                <Input className="h-8" type="date" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-2 font-medium">柜号<span className="text-destructive">*</span></th>
                    <th className="text-left p-2 font-medium">货物描述<span className="text-destructive">*</span></th>
                    <th className="text-right p-2 font-medium">数量<span className="text-destructive">*</span></th>
                    <th className="text-right p-2 font-medium">重量<span className="text-destructive">*</span></th>
                    <th className="text-left p-2 font-medium">货柜类型<span className="text-destructive">*</span></th>
                  </tr>
                </thead>
                <tbody>
                  {containers.map((c) => (
                    <tr key={c.id} className="border-b">
                      <td className="p-2">{c.containerNo}</td>
                      <td className="p-2">{c.goodsDesc}</td>
                      <td className="p-2 text-right">{c.quantity}</td>
                      <td className="p-2 text-right">{c.weight}</td>
                      <td className="p-2">{c.containerType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-t pt-4 mt-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="grid grid-cols-3 items-center gap-2">
                <Label className="text-right text-xs">saber货物描述</Label>
                <Input className="col-span-2 h-8" />
              </div>
              <div className="grid grid-cols-3 items-center gap-2">
                <Label className="text-right text-xs">saber海关编码</Label>
                <Input className="col-span-2 h-8" />
              </div>
              <div className="grid grid-cols-3 items-center gap-2">
                <Label className="text-right text-xs">货物名称<span className="text-destructive">*</span></Label>
                <Input className="col-span-2 h-8" />
              </div>
            </div>
          </div>

          <div className="border-t pt-4 mt-4">
            <h4 className="font-medium mb-2">提单数量及重量</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid grid-cols-3 items-center gap-2">
                <Label className="text-right text-xs">提单重量<span className="text-destructive">*</span></Label>
                <Input className="col-span-2 h-8" />
              </div>
              <div className="grid grid-cols-3 items-center gap-2">
                <Label className="text-right text-xs">提单总重<span className="text-destructive">*</span></Label>
                <Input className="col-span-2 h-8" />
              </div>
              <div className="grid grid-cols-3 items-center gap-2">
                <Label className="text-right text-xs">提单数量<span className="text-destructive">*</span></Label>
                <Input className="col-span-2 h-8" />
              </div>
            </div>
          </div>
        </div>

        {/* 发票明细 */}
        <div className="bg-card rounded-lg border p-4">
          <h3 className="text-base font-semibold mb-4 text-primary border-b pb-2">发票明细</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-right text-xs">交易类型<span className="text-destructive">*</span></Label>
              <Input className="col-span-2 h-8" defaultValue="C&I" />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-right text-xs">发票编号<span className="text-destructive">*</span></Label>
              <Input className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-right text-xs">业务类型</Label>
              <Select>
                <SelectTrigger className="col-span-2 h-8">
                  <SelectValue placeholder="选择业务类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">固定金额</SelectItem>
                  <SelectItem value="insured">已投保</SelectItem>
                  <SelectItem value="commercial">商业保险</SelectItem>
                  <SelectItem value="exempt">免税</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-right text-xs">币种<span className="text-destructive">*</span></Label>
              <Input className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-right text-xs">总申报价值<span className="text-destructive">*</span></Label>
              <Input className="col-span-2 h-8" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-right text-xs">出口公司<span className="text-destructive">*</span></Label>
              <Input className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-right text-xs">出口国家<span className="text-destructive">*</span></Label>
              <Input className="col-span-2 h-8" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-2 font-medium">产品名称<span className="text-destructive">*</span></th>
                  <th className="text-left p-2 font-medium">HSCode<span className="text-destructive">*</span></th>
                  <th className="text-left p-2 font-medium">型号<span className="text-destructive">*</span></th>
                  <th className="text-right p-2 font-medium">数量(箱)<span className="text-destructive">*</span></th>
                  <th className="text-right p-2 font-medium">单价(CNF美元)<span className="text-destructive">*</span></th>
                  <th className="text-right p-2 font-medium">总CNF价格(美元)<span className="text-destructive">*</span></th>
                  <th className="text-left p-2 font-medium">SABER文件</th>
                </tr>
              </thead>
              <tbody>
                {invoiceProducts.map((p) => (
                  <tr key={p.id} className="border-b">
                    <td className="p-2">{p.productName}</td>
                    <td className="p-2">{p.hsCode}</td>
                    <td className="p-2">{p.model}</td>
                    <td className="p-2 text-right">{p.quantity}</td>
                    <td className="p-2 text-right">{p.unitPrice}</td>
                    <td className="p-2 text-right">{p.totalPrice}</td>
                    <td className="p-2">
                      {p.saberFile !== "无" ? (
                        <a href="#" className="text-primary hover:underline">{p.saberFile}</a>
                      ) : p.saberFile}
                    </td>
                  </tr>
                ))}
                <tr className="font-medium bg-muted/30">
                  <td colSpan={5} className="p-2 text-right">总计</td>
                  <td className="p-2 text-right">{totalInvoice.toFixed(2)}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 所需文件 */}
        <div className="bg-card rounded-lg border p-4">
          <h3 className="text-base font-semibold mb-4 text-primary border-b pb-2">所需文件</h3>
          <div className="flex flex-wrap gap-2">
            {["产地证", "装箱单", "提单", "担保函", "声明与检验准备请求", "工业承诺书", "应得编号"].map((doc) => (
              <a key={doc} href="#" className="text-primary hover:underline text-sm">{doc}</a>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
