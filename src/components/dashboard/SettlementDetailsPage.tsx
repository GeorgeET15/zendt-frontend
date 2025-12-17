import PageContainer from "./PageContainer";
import PaymentAccordion from "./PaymentAccordion";
import BackButton from "./BackButton";

export default function SettlementDetailsPage() {
  return (
    <PageContainer className="text-white space-y-6 mt-6 px-4">
      <div className="flex flex-col gap-4">
        <BackButton />
        <div>
          <h1 className="text-[18px] font-semibold">Settlement details</h1>
          <p className="text-sm text-white/70">Available payout options</p>
        </div>
      </div>
      <PaymentAccordion />
    </PageContainer>
  );
}
