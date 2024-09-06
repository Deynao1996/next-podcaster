import DashboardHeader from '@/components/headerUI/DashboardHeader'
import SalesList from '@/components/lists/SalesList'
import TransactionsList from '@/components/lists/TransactionsList'
import RevenueList from '@/components/lists/RevenueList'

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <RevenueList />
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <TransactionsList />
          <SalesList />
        </div>
      </main>
    </div>
  )
}

export default DashboardPage
