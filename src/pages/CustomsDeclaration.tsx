import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { X, Send, Copy, ChevronUp, ChevronDown, Download } from "lucide-react";

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

interface Attachment {
  id: string;
  type: string;
  fileName: string;
  selected: boolean;
  status: string;
  remark: string;
  reviewDate: string;
  reviewer: string;
}

export default function CustomsDeclaration() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [step1Open, setStep1Open] = useState(true);
  const [step2Open, setStep2Open] = useState(true);
  const [step3Open, setStep3Open] = useState(true);
  const [step4Open, setStep4Open] = useState(true);

  const [containers] = useState<ContainerInfo[]>([
    { id: "1", containerNo: "ECMU 85823", goodsDesc: "Other anionic organic surface", quantity: 4870, weight: 23289, containerType: "40尺标准柜" },
    { id: "2", containerNo: "ECMU 85824", goodsDesc: "Other anionic organic surface", quantity: 2898, weight: 28700, containerType: "40尺标准柜" },
  ]);

  const [invoiceProducts] = useState<InvoiceProduct[]>([
    { id: "1", productName: "衣架", hsCode: "HScode1", model: "衣架", quantity: 461, unitPrice: 5.57, totalPrice: 2567.77, saberFile: "SABER2" },
    { id: "2", productName: "箱子", hsCode: "HSCode2", model: "箱子", quantity: 40, unitPrice: 4.25, totalPrice: 170, saberFile: "SABER1" },
  ]);

  const [attachments, setAttachments] = useState<Attachment[]>([
    { id: "1", type: "提单文件", fileName: "td.pdf", selected: true, status: "已审核", remark: "", reviewDate: "2025/11/22", reviewer: "steven" },
    { id: "2", type: "装箱单", fileName: "z.pdf", selected: false, status: "已审核", remark: "", reviewDate: "2025/11/22", reviewer: "steven" },
    { id: "3", type: "发票", fileName: "f.pdf", selected: true, status: "已审核", remark: "", reviewDate: "2025/11/22", reviewer: "steven" },
    { id: "4", type: "SABER", fileName: "a.pdf;b.pdf", selected: true, status: "已审核", remark: "", reviewDate: "2025/11/22", reviewer: "steven" },
  ]);

  const [blContainers] = useState<ContainerInfo[]>([
    { id: "1", containerNo: "ECMU 85823", goodsDesc: "Other anionic organic surface-", quantity: 4870, weight: 23289, containerType: "40尺标准柜" },
    { id: "2", containerNo: "TCKU 6311253", goodsDesc: "Other anionic organic surface-", quantity: 2898, weight: 28700, containerType: "40尺标准柜" },
  ]);

  const toggleAttachmentSelection = (id: string) => {
    setAttachments(attachments.map(a => 
      a.id === id ? { ...a, selected: !a.selected } : a
    ));
  };

  const totalInvoice = invoiceProducts.reduce((sum, p) => sum + p.totalPrice, 0);

  const CopyButton = () => (
    <Button variant="ghost" size="sm" className="h-5 w-5 p-0 ml-1">
      <Copy className="h-3 w-3 text-muted-foreground" />
    </Button>
  );

  return (
    <MainLayout title="海关申报">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Label className="font-medium">完成海关申报时间<span className="text-destructive">*</span></Label>
            <Input type="datetime-local" className="w-64" defaultValue="2025-12-13T17:38" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
              <X className="w-4 h-4 mr-1" />
              关闭
            </Button>
            <Button size="sm">
              <Send className="w-4 h-4 mr-1" />
              提交
            </Button>
          </div>
        </div>

        {/* 订单信息 */}
        <div className="bg-card rounded-lg border p-4">
          <h3 className="text-base font-semibold mb-4 text-primary border-b pb-2">订单信息</h3>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">提单号码</Label>
            <div className="col-span-3 flex items-center">
              <span className="font-medium">55-58559</span>
              <CopyButton />
            </div>
          </div>
        </div>

        {/* 第1步 申报详情 */}
        <Collapsible open={step1Open} onOpenChange={setStep1Open}>
          <div className="bg-yellow-50 rounded-lg border border-yellow-200 overflow-hidden">
            <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-yellow-100 transition-colors">
              <h3 className="text-base font-semibold text-yellow-800">第1步 申报详情 - 录入货物信息</h3>
              {step1Open ? <ChevronUp className="w-5 h-5 text-yellow-600" /> : <ChevronDown className="w-5 h-5 text-yellow-600" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-0 bg-card border-t">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-3 items-center gap-2">
                  <Label className="text-right text-sm">海关港口</Label>
                  <span className="col-span-2">达曼港</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-2">
                  <Label className="text-right text-sm">申报类型</Label>
                  <span className="col-span-2">进口/即时清关</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-2">
                  <Label className="text-right text-sm">付款方式</Label>
                  <span className="col-span-2">现金/政府保险</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-2">
                  <Label className="text-right text-sm">进口国</Label>
                  <span className="col-span-2">SA</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-2">
                  <Label className="text-right text-sm">海关出口口岸</Label>
                  <span className="col-span-2">达曼海关</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-2">
                  <Label className="text-right text-sm">经纪商授权码</Label>
                  <div className="col-span-2 flex items-center">
                    <span>xxxxxxxxxxx</span>
                    <CopyButton />
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* 第2步 提单详情 */}
        <Collapsible open={step2Open} onOpenChange={setStep2Open}>
          <div className="bg-green-50 rounded-lg border border-green-200 overflow-hidden">
            <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-green-100 transition-colors">
              <h3 className="text-base font-semibold text-green-800">第2步 提单详情 - 添加BL提单信息</h3>
              {step2Open ? <ChevronUp className="w-5 h-5 text-green-600" /> : <ChevronDown className="w-5 h-5 text-green-600" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-0 bg-card border-t">
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">提单号码</Label>
                    <span className="flex items-center">55-58559 <CopyButton /></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">提单日期</Label>
                    <span className="flex items-center">2025/11/28 <CopyButton /></span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-2 font-medium">柜号</th>
                        <th className="text-left p-2 font-medium">货物描述</th>
                        <th className="text-right p-2 font-medium">数量</th>
                        <th className="text-right p-2 font-medium">重量</th>
                        <th className="text-left p-2 font-medium">货柜类型</th>
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

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">交易类型</Label>
                    <span>C&I</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">发票号码</Label>
                    <span className="flex items-center">RHD202510067 <CopyButton /></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">发票货币币种</Label>
                    <span className="flex items-center">USD <CopyButton /></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">发票共计费用</Label>
                    <span className="flex items-center">4,024.65 <CopyButton /></span>
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <Label className="text-sm">出口公司名称</Label>
                    <span className="flex items-center">SHENZHEN CHUANGGONG IMP&EXP CO. LTD <CopyButton /></span>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* 第3步 发票与物品 */}
        <Collapsible open={step3Open} onOpenChange={setStep3Open}>
          <div className="bg-purple-50 rounded-lg border border-purple-200 overflow-hidden">
            <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-purple-100 transition-colors">
              <h3 className="text-base font-semibold text-purple-800">第3步 发票与物品 - 输入货物saber海关编码-填写货物名称(有几个saber就填写几个)</h3>
              {step3Open ? <ChevronUp className="w-5 h-5 text-purple-600" /> : <ChevronDown className="w-5 h-5 text-purple-600" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-0 bg-card border-t">
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-2 font-medium">产品名称</th>
                        <th className="text-left p-2 font-medium">HSCode</th>
                        <th className="text-left p-2 font-medium">型号</th>
                        <th className="text-right p-2 font-medium">数量(箱)</th>
                        <th className="text-right p-2 font-medium">单价(CNF美元)</th>
                        <th className="text-right p-2 font-medium">总CNF价格</th>
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
                            <a href="#" className="text-primary hover:underline">{p.saberFile}</a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">提单总重量</Label>
                    <span className="flex items-center">2142 <CopyButton /></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">提单总数量</Label>
                    <span className="flex items-center">2028 <CopyButton /></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">业务类型</Label>
                    <span>固定金额/已投保/商业保险/免税</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">货物最终到达位置</Label>
                    <span className="flex items-center">达曼 <CopyButton /></span>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* 第4步 附加详情 */}
        <Collapsible open={step4Open} onOpenChange={setStep4Open}>
          <div className="bg-orange-50 rounded-lg border border-orange-200 overflow-hidden">
            <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-orange-100 transition-colors">
              <h3 className="text-base font-semibold text-orange-800">第4步 附加详情 - 提交发票和saber证书</h3>
              {step4Open ? <ChevronUp className="w-5 h-5 text-orange-600" /> : <ChevronDown className="w-5 h-5 text-orange-600" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-0 bg-card border-t">
              <div className="space-y-4">
                <h4 className="font-medium">附件(清关)</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-2 font-medium">类型</th>
                        <th className="text-left p-2 font-medium">文件名</th>
                        <th className="text-center p-2 font-medium">选择</th>
                        <th className="text-left p-2 font-medium">状态</th>
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
                            <Checkbox
                              checked={att.selected}
                              onCheckedChange={() => toggleAttachmentSelection(att.id)}
                            />
                          </td>
                          <td className="p-2 text-status-completed">{att.status}</td>
                          <td className="p-2 text-muted-foreground">{att.remark}</td>
                          <td className="p-2 text-center text-muted-foreground">{att.reviewDate}</td>
                          <td className="p-2 text-center text-muted-foreground">{att.reviewer}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  下载选择文件
                </Button>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* 提单信息 */}
        <div className="bg-card rounded-lg border p-4">
          <h3 className="text-base font-semibold mb-4 text-primary border-b pb-2">提单信息</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-medium mb-2">发件人</h4>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-4 items-center gap-2">
                  <Label className="text-right text-xs">发货人名称</Label>
                  <span className="col-span-3">SHENZHEN CHUANGGONG IMP&EXP CO. LTD</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-2">
                  <Label className="text-right text-xs">发货联系人</Label>
                  <span className="col-span-1">-</span>
                  <Label className="text-right text-xs">电话</Label>
                  <span className="col-span-1">-</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-2">
                  <Label className="text-right text-xs">发货人地址</Label>
                  <span className="col-span-3">24E SHENGANG GARDEN SHENNAN EAST ROAD HUANGBEI STREET LUOHU</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">收件人</h4>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-4 items-center gap-2">
                  <Label className="text-right text-xs">收件人名称<span className="text-destructive">*</span></Label>
                  <span className="col-span-3">HANA HUSSAIN SAEED ALZAHRA【CHUANGGONG IMP】</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-2">
                  <Label className="text-right text-xs">收件联系人</Label>
                  <span className="col-span-1">-</span>
                  <Label className="text-right text-xs">电话</Label>
                  <span className="col-span-1">-</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-2">
                  <Label className="text-right text-xs">收件人地址</Label>
                  <span className="col-span-3">BUILDING NO.4166,FALASTEEN STREET,AL HAMRA DISTRICT,JEDDAH CITY,SAUDI ARABIA</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">BL提单信息</h4>
            <div className="grid grid-cols-4 gap-4 mb-4 text-sm">
              <div className="flex items-center gap-2">
                <Label className="text-xs">提单号</Label>
                <span>-</span>
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-xs">提单日期</Label>
                <span>-</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-2 font-medium">柜号</th>
                    <th className="text-left p-2 font-medium">货物描述</th>
                    <th className="text-right p-2 font-medium">数量</th>
                    <th className="text-right p-2 font-medium">重量</th>
                    <th className="text-left p-2 font-medium">货柜类型</th>
                  </tr>
                </thead>
                <tbody>
                  {blContainers.map((c) => (
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
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Label className="text-xs">saber货物描述</Label>
                <span>-</span>
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-xs">saber海关编码</Label>
                <span>-</span>
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-xs">货物名称<span className="text-destructive">*</span></Label>
                <span>-</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4 mt-4">
            <h4 className="font-medium mb-2">提单数量及重量</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Label className="text-xs">提单重量<span className="text-destructive">*</span></Label>
                <span>-</span>
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-xs">提单总重<span className="text-destructive">*</span></Label>
                <span>-</span>
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-xs">提单数量<span className="text-destructive">*</span></Label>
                <span>-</span>
              </div>
            </div>
          </div>
        </div>

        {/* 发票明细 */}
        <div className="bg-card rounded-lg border p-4">
          <h3 className="text-base font-semibold mb-4 text-primary border-b pb-2">发票明细</h3>
          <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
            <div className="flex items-center gap-2">
              <Label className="text-xs">交易类型</Label>
              <span>C&I</span>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-xs">发票编号</Label>
              <span>-</span>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-xs">业务类型</Label>
              <span>固定金额、已投保、商业保险、免税</span>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-xs">币种</Label>
              <span>-</span>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-xs">总申报价值</Label>
              <span>-</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div className="flex items-center gap-2">
              <Label className="text-xs">出口公司</Label>
              <span>-</span>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-xs">出口国家</Label>
              <span>-</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-2 font-medium">产品名称</th>
                  <th className="text-left p-2 font-medium">HSCode</th>
                  <th className="text-left p-2 font-medium">型号</th>
                  <th className="text-right p-2 font-medium">数量(箱)</th>
                  <th className="text-right p-2 font-medium">单价(CNF美元)</th>
                  <th className="text-right p-2 font-medium">总CNF价格(美元)</th>
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
                      <a href="#" className="text-primary hover:underline">{p.saberFile}</a>
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
      </div>
    </MainLayout>
  );
}
