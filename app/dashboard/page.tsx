import SalesList from '@/components/lists/SalesList'
import TransactionsList from '@/components/lists/TransactionsList'
import StatList from '@/components/lists/StatList'
import RadialChart from '@/components/chartsUI/RadialChart'

const DashboardPage = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <StatList />
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <SalesList />
        <RadialChart />
      </div>
      <footer>
        <TransactionsList />
      </footer>
    </main>
  )
}

export default DashboardPage
