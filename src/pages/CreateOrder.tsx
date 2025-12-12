import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PageCard } from "@/components/common/PageCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Plus, Trash2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface IncomeItem {
  id: string;
  category: string;
  name: string;
  method: string;
  price: number;
  currency: string;
  unit: string;
  quantity: number;
  amount: number;
  remark: string;
}

interface ContainerItem {
  id: string;
  containerNo: string;
  description: string;
  quantity: number;
  weight: number;
  type: string;
}

interface InvoiceItem {
  id: string;
  productName: string;
  hsCode: string;
  model: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  saberFile: string;
}

interface FileUpload {
  name: string;
  file: File | null;
}

export default function CreateOrder() {
  const navigate = useNavigate();
  
  const [incomeItems, setIncomeItems] = useState<IncomeItem[]>([
    { id: "1", category: "集装箱", name: "港口费", method: "固定", price: 100, currency: "SAR", unit: "柜", quantity: 1, amount: 100, remark: "" },
    { id: "2", category: "", name: "港口操作", method: "固定", price: 100, currency: "SAR", unit: "柜", quantity: 1, amount: 100, remark: "" },
    { id: "3", category: "", name: "查验费", method: "实报", price: 100, currency: "SAR", unit: "柜", quantity: 1, amount: 100, remark: "" },
  ]);

  const [containers, setContainers] = useState<ContainerItem[]>([
    { id: "1", containerNo: "ECMU 85823", description: "Other anionic organic surface-", quantity: 4870, weight: 23289, type: "40尺标准柜" },
    { id: "2", containerNo: "TCKU 6311253", description: "Other anionic organic surface-", quantity: 2898, weight: 28700, type: "40尺标准柜" },
  ]);

  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
    { id: "1", productName: "衣架", hsCode: "HScode1", model: "衣架", quantity: 461, unitPrice: 5.57, totalPrice: 2567.77, saberFile: "无" },
    { id: "2", productName: "箱子", hsCode: "HSCode2", model: "箱子", quantity: 40, unitPrice: 4.25, totalPrice: 170, saberFile: "SABER1" },
  ]);

  const [files, setFiles] = useState<Record<string, FileUpload>>({
    billOfLading: { name: "td.pdf", file: null },
    packingList: { name: "z.pdf", file: null },
    invoice: { name: "f.pdf", file: null },
    saber: { name: "a.pdf;b.pdf", file: null },
    clearanceAuth: { name: "qgsqh.pdf", file: null },
    shippingAuth: { name: "qssqh.pdf", file: null },
  });

  const addIncomeItem = () => {
    const newItem: IncomeItem = {
      id: Date.now().toString(),
      category: "",
      name: "",
      method: "固定",
      price: 0,
      currency: "SAR",
      unit: "柜",
      quantity: 1,
      amount: 0,
      remark: "",
    };
    setIncomeItems([...incomeItems, newItem]);
  };

  const removeIncomeItem = (id: string) => {
    setIncomeItems(incomeItems.filter(item => item.id !== id));
  };

  const addContainer = () => {
    const newItem: ContainerItem = {
      id: Date.now().toString(),
      containerNo: "",
      description: "",
      quantity: 0,
      weight: 0,
      type: "40尺标准柜",
    };
    setContainers([...containers, newItem]);
  };

  const removeContainer = (id: string) => {
    setContainers(containers.filter(item => item.id !== id));
  };

  const addInvoiceItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      productName: "",
      hsCode: "",
      model: "",
      quantity: 0,
      unitPrice: 0,
      totalPrice: 0,
      saberFile: "",
    };
    setInvoiceItems([...invoiceItems, newItem]);
  };

  const removeInvoiceItem = (id: string) => {
    setInvoiceItems(invoiceItems.filter(item => item.id !== id));
  };

  const handleSubmit = () => {
    toast.success("订单创建成功");
    navigate("/orders");
  };

  const handleClose = () => {
    navigate("/orders");
  };

  const invoiceTotal = invoiceItems.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <MainLayout title="创建订单">
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleClose} className="gap-1.5">
            <X className="w-4 h-4" />
            关闭
          </Button>
          <Button onClick={handleSubmit}>提交</Button>
        </div>

        {/* 订单信息 */}
        <PageCard title="订单信息">
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">客户名称<span className="text-destructive">*</span></label>
              <Input placeholder="请输入客户名称" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">出口国家<span className="text-destructive">*</span></label>
              <Input placeholder="请输入出口国家" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">出口公司<span className="text-destructive">*</span></label>
              <Input placeholder="请输入出口公司" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">进口国家<span className="text-destructive">*</span></label>
              <Input placeholder="请输入进口国家" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">目的城市<span className="text-destructive">*</span></label>
              <Input placeholder="请输入目的城市" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">目的港口<span className="text-destructive">*</span></label>
              <Input placeholder="请输入目的港口" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">目的地海关<span className="text-destructive">*</span></label>
              <Input placeholder="请输入目的地海关" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">航司名称<span className="text-destructive">*</span></label>
              <Select defaultValue="COSCO">
                <SelectTrigger>
                  <SelectValue placeholder="选择航司" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="COSCO">COSCO</SelectItem>
                  <SelectItem value="MAERSK">MAERSK</SelectItem>
                  <SelectItem value="MSC">MSC</SelectItem>
                  <SelectItem value="CMA">CMA CGM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">代理清关<span className="text-destructive">*</span></label>
              <Select defaultValue="yes">
                <SelectTrigger>
                  <SelectValue placeholder="选择" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">是</SelectItem>
                  <SelectItem value="no">否</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">清关公司<span className="text-destructive">*</span></label>
              <Input placeholder="请输入清关公司" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">经纪商授权码<span className="text-destructive">*</span></label>
              <Input placeholder="请输入经纪商授权码" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">申报类型<span className="text-destructive">*</span></label>
              <Select defaultValue="import">
                <SelectTrigger>
                  <SelectValue placeholder="选择申报类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="import">进口申报</SelectItem>
                  <SelectItem value="immediate">立即清关（1万SAR）</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 space-y-1">
              <label className="text-sm font-medium text-foreground">备注</label>
              <Textarea placeholder="请输入备注信息" rows={3} />
            </div>
          </div>
        </PageCard>

        {/* 附件(清关) */}
        <PageCard title="附件(清关)">
          <div className="space-y-4">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="w-40">文件类型</th>
                  <th className="w-24">操作</th>
                  <th>文件名</th>
                  <th className="w-28">快捷操作</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { key: "billOfLading", label: "提单文件", required: true, hasQuick: true },
                  { key: "packingList", label: "装箱单", required: false, hasQuick: false },
                  { key: "invoice", label: "发票", required: true, hasQuick: true },
                  { key: "saber", label: "SABER", required: true, hasQuick: true },
                  { key: "clearanceAuth", label: "清关授权函", required: true, hasQuick: false },
                  { key: "shippingAuth", label: "船司授权函", required: true, hasQuick: false },
                ].map((item) => (
                  <tr key={item.key}>
                    <td>
                      {item.label}
                      {item.required && <span className="text-destructive">*</span>}
                    </td>
                    <td>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Upload className="w-3 h-3" />
                        上传
                      </Button>
                    </td>
                    <td>
                      <a href="#" className="text-primary hover:underline text-sm">
                        {files[item.key]?.name || "-"}
                      </a>
                    </td>
                    <td>
                      {item.hasQuick && (
                        <Button variant="ghost" size="sm" className="text-primary">
                          快捷生成
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PageCard>

        {/* 附件(费用) */}
        <PageCard title="附件(费用)">
          <div className="text-center py-8 text-muted-foreground">
            <Upload className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p className="text-sm">拖拽或点击上传费用相关附件</p>
          </div>
        </PageCard>

        {/* 轨迹 */}
        <PageCard title="轨迹">
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">暂无轨迹信息</p>
          </div>
        </PageCard>

        {/* 应收项目 */}
        <PageCard title="应收项目">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-foreground">选择销售报价<span className="text-destructive">*</span></label>
              <Select defaultValue="quote1">
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="选择报价" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quote1">客户1 报价1</SelectItem>
                  <SelectItem value="quote2">客户2 报价2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>类别</th>
                    <th>项目名称<span className="text-destructive">*</span></th>
                    <th>方式<span className="text-destructive">*</span></th>
                    <th>价格<span className="text-destructive">*</span></th>
                    <th>币种<span className="text-destructive">*</span></th>
                    <th>单位<span className="text-destructive">*</span></th>
                    <th>数量<span className="text-destructive">*</span></th>
                    <th>金额<span className="text-destructive">*</span></th>
                    <th>备注</th>
                    <th className="w-16">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {incomeItems.map((item) => (
                    <tr key={item.id}>
                      <td><Input value={item.category} className="h-8 w-20" /></td>
                      <td><Input value={item.name} className="h-8 w-24" /></td>
                      <td>
                        <Select value={item.method}>
                          <SelectTrigger className="h-8 w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="固定">固定</SelectItem>
                            <SelectItem value="实报">实报</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td><Input type="number" value={item.price} className="h-8 w-20" /></td>
                      <td>
                        <Select value={item.currency}>
                          <SelectTrigger className="h-8 w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SAR">SAR</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="CNY">CNY</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td><Input value={item.unit} className="h-8 w-16" /></td>
                      <td><Input type="number" value={item.quantity} className="h-8 w-16" /></td>
                      <td><Input type="number" value={item.amount} className="h-8 w-20" readOnly /></td>
                      <td><Input value={item.remark} className="h-8 w-20" /></td>
                      <td>
                        <Button variant="ghost" size="sm" onClick={() => removeIncomeItem(item.id)} className="text-destructive hover:text-destructive">
                          删除
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Button variant="outline" size="sm" onClick={addIncomeItem} className="gap-1">
              <Plus className="w-4 h-4" />
              添加收入项
            </Button>
          </div>
        </PageCard>

        {/* 提单信息 */}
        <PageCard title="提单信息">
          <div className="space-y-6">
            {/* 发件人/收件人信息 */}
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">发件人<span className="text-destructive">*</span></h4>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-sm text-muted-foreground">发货人名称<span className="text-destructive">*</span></label>
                    <Input defaultValue="SHENZHEN CHUANGGONG IMP&EXP CO. LTD" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-sm text-muted-foreground">发货联系人</label>
                      <Input placeholder="请输入" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm text-muted-foreground">发货联系人电话</label>
                      <Input placeholder="请输入" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm text-muted-foreground">发货人地址</label>
                    <Textarea defaultValue="24E SHENGANG GARDEN SHENNAN EAST ROAD HUANGBEI STREET LUOHU*" rows={2} />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">收件人<span className="text-destructive">*</span></h4>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-sm text-muted-foreground">收件人名称<span className="text-destructive">*</span></label>
                    <Input defaultValue="HANA HUSSAIN SAEED ALZAHRA【CHUANGGONG IMP】" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-sm text-muted-foreground">收件联系人</label>
                      <Input placeholder="请输入" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm text-muted-foreground">收件联系人电话</label>
                      <Input placeholder="请输入" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm text-muted-foreground">收件人地址</label>
                    <Textarea defaultValue="BUILDING NO.4166,FALASTEEN STREET,AL HAMRA DISTRICT,JEDDAH CITY,SAUDI ARABIA**" rows={2} />
                  </div>
                </div>
              </div>
            </div>

            {/* BL提单信息 */}
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">BL提单信息</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm text-muted-foreground">提单号<span className="text-destructive">*</span></label>
                  <Input placeholder="请输入提单号" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-muted-foreground">提单日期</label>
                  <Input type="date" />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>柜号<span className="text-destructive">*</span></th>
                      <th>货物描述<span className="text-destructive">*</span></th>
                      <th>数量<span className="text-destructive">*</span></th>
                      <th>重量<span className="text-destructive">*</span></th>
                      <th>货柜类型<span className="text-destructive">*</span></th>
                      <th className="w-16">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {containers.map((item) => (
                      <tr key={item.id}>
                        <td><Input value={item.containerNo} className="h-8" /></td>
                        <td><Input value={item.description} className="h-8" /></td>
                        <td><Input type="number" value={item.quantity} className="h-8 w-24" /></td>
                        <td><Input type="number" value={item.weight} className="h-8 w-24" /></td>
                        <td>
                          <Select value={item.type}>
                            <SelectTrigger className="h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="20尺标准柜">20尺标准柜</SelectItem>
                              <SelectItem value="40尺标准柜">40尺标准柜</SelectItem>
                              <SelectItem value="40尺高柜">40尺高柜</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td>
                          <Button variant="ghost" size="icon" onClick={() => removeContainer(item.id)} className="text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Button variant="outline" size="sm" onClick={addContainer} className="gap-1">
                <Plus className="w-4 h-4" />
                添加货柜
              </Button>
            </div>

            {/* SABER信息 */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-sm text-muted-foreground">saber货物描述</label>
                <Input placeholder="请输入" />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-muted-foreground">saber海关编码</label>
                <Input placeholder="请输入" />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-muted-foreground">货物名称<span className="text-destructive">*</span></label>
                <Input placeholder="请输入" />
              </div>
            </div>

            {/* 提单数量及重量 */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-sm text-muted-foreground">提单重量<span className="text-destructive">*</span></label>
                <Input placeholder="请输入" />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-muted-foreground">提单总重<span className="text-destructive">*</span></label>
                <Input placeholder="请输入" />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-muted-foreground">提单数量<span className="text-destructive">*</span></label>
                <Input placeholder="请输入" />
              </div>
            </div>
          </div>
        </PageCard>

        {/* 发票明细 */}
        <PageCard title="发票明细">
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-sm text-muted-foreground">交易类型<span className="text-destructive">*</span></label>
                <Select defaultValue="ci">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ci">C&I</SelectItem>
                    <SelectItem value="fob">FOB</SelectItem>
                    <SelectItem value="cif">CIF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <label className="text-sm text-muted-foreground">发票编号<span className="text-destructive">*</span></label>
                <Input placeholder="请输入" />
              </div>
              <div className="col-span-2 space-y-1">
                <label className="text-sm text-muted-foreground">业务类型</label>
                <Select>
                  <SelectTrigger>
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
              <div className="space-y-1">
                <label className="text-sm text-muted-foreground">币种<span className="text-destructive">*</span></label>
                <Select defaultValue="USD">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="CNY">CNY</SelectItem>
                    <SelectItem value="SAR">SAR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <label className="text-sm text-muted-foreground">总申报价值<span className="text-destructive">*</span></label>
                <Input placeholder="请输入" />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-muted-foreground">出口公司<span className="text-destructive">*</span></label>
                <Input placeholder="请输入" />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-muted-foreground">出口国家<span className="text-destructive">*</span></label>
                <Input placeholder="请输入" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>产品名称<span className="text-destructive">*</span></th>
                    <th>HSCode<span className="text-destructive">*</span></th>
                    <th>型号<span className="text-destructive">*</span></th>
                    <th>数量(箱)<span className="text-destructive">*</span></th>
                    <th>单价(CNF美元)<span className="text-destructive">*</span></th>
                    <th>总CNF价格(美元)<span className="text-destructive">*</span></th>
                    <th>SABER文件</th>
                    <th className="w-16">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceItems.map((item) => (
                    <tr key={item.id}>
                      <td><Input value={item.productName} className="h-8" /></td>
                      <td><Input value={item.hsCode} className="h-8 w-24" /></td>
                      <td><Input value={item.model} className="h-8 w-24" /></td>
                      <td><Input type="number" value={item.quantity} className="h-8 w-20" /></td>
                      <td><Input type="number" value={item.unitPrice} step="0.01" className="h-8 w-24" /></td>
                      <td><Input type="number" value={item.totalPrice} step="0.01" className="h-8 w-28" readOnly /></td>
                      <td><Input value={item.saberFile} className="h-8 w-24" /></td>
                      <td>
                        <Button variant="ghost" size="icon" onClick={() => removeInvoiceItem(item.id)} className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-muted/30">
                    <td colSpan={5} className="text-right font-medium">总计</td>
                    <td className="font-bold">{invoiceTotal.toFixed(2)}</td>
                    <td colSpan={2}></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Button variant="outline" size="sm" onClick={addInvoiceItem} className="gap-1">
              <Plus className="w-4 h-4" />
              添加产品
            </Button>
          </div>
        </PageCard>

        {/* 所需文件 */}
        <PageCard title="所需文件">
          <div className="flex flex-wrap gap-2">
            {["产地证", "装箱单", "提单", "担保函", "声明与检验准备请求", "工业承诺书", "应得编号"].map((doc) => (
              <span key={doc} className="px-3 py-1.5 bg-accent text-accent-foreground rounded-md text-sm hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors">
                {doc}
              </span>
            ))}
          </div>
        </PageCard>

        {/* Bottom Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button variant="outline" onClick={handleClose} className="gap-1.5">
            <X className="w-4 h-4" />
            关闭
          </Button>
          <Button onClick={handleSubmit}>提交订单</Button>
        </div>
      </div>
    </MainLayout>
  );
}
