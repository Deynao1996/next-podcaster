import PieStatChart from '@/components/chartsUI/PieStatChart'
import DashboardStats from '@/components/DashboardStats'
import TabsDataTable from '@/components/TabsDataTable'

const CustomersPage = () => {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 md:gap-8 md:p-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="col-span-3 grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <DashboardStats />
      </div>
      <div className="max-lg:col-span-3">
        <PieStatChart />
      </div>
      <div className="col-span-3">
        <TabsDataTable />
      </div>
    </main>
  )
}

export default CustomersPage
