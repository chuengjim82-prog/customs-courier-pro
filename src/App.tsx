import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import OrderList from "./pages/OrderList";
import ClearanceList from "./pages/ClearanceList";
import DeliveryList from "./pages/DeliveryList";
import IncomeList from "./pages/IncomeList";
import PaymentList from "./pages/PaymentList";
import CreateOrder from "./pages/CreateOrder";
import ReviewOrder from "./pages/ReviewOrder";
import CustomsDeclaration from "./pages/CustomsDeclaration";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/orders" replace />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/orders/create" element={<CreateOrder />} />
          <Route path="/orders/:id/review" element={<ReviewOrder />} />
          <Route path="/orders/:id/declaration" element={<CustomsDeclaration />} />
          <Route path="/clearance" element={<ClearanceList />} />
          <Route path="/delivery" element={<DeliveryList />} />
          <Route path="/income" element={<IncomeList />} />
          <Route path="/payment" element={<PaymentList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
