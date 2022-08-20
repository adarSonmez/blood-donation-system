import { useEffect, useState } from 'react'

import {
  getTopTenDonors,
  getTopTenHospitals,
  getTopTenReceptionists,
} from '../../api/tops.api'
import { Tab, Tabs } from '@mui/material'
import { Box } from '@mui/system'
import TabPanel from '../../components/tab-panel/TabPanel'
import TopTensTable from '../../components/top-tens-table/TopTensTable'

function Champions() {
  const [tabNumber, setTabNumber] = useState(0)
  const [tableData, setTableData] = useState([{ id: 0, name: '', amount: 0 }])
  const [topDonors, setTopDonors] = useState({
    title: '',
    unit: '',
  })
  const [topHospitals, setTopHospitals] = useState({
    title: '',
    unit: '',
  })
  const [topReceptionists, setTopReceptionists] = useState({
    title: '',
    unit: '',
  })

  useEffect(() => {
    getTopTenDonors()
      .then((r) => {
        setTableData(
          r.data.map(({ donor_id, name, num_of_blood }) => {
            return {
              id: donor_id,
              name: name,
              amount: num_of_blood,
            }
          })
        )
        setTopDonors({
          title: 'Donors who donate the most blood.',
          unit: 'Donations (Units)',
        })
      })
      .catch((err) => console.error(err.message))

    getTopTenReceptionists()
      .then((r) => {
        setTableData(
          r.data.map(({ user_id, full_name, num_of_registration }) => {
            return {
              id: user_id,
              name: full_name,
              amount: num_of_registration,
            }
          })
        )
        setTopReceptionists({
          title: 'Receptionists who registered the most donors in our system.',
          unit: 'Registrations (Donors)',
        })
      })
      .catch((err) => console.error(err.message))

    getTopTenHospitals()
      .then((r) => {
        setTableData(
          r.data.map(({ user_id, full_name, amount_of_blood }) => {
            return {
              id: user_id,
              name: full_name,
              amount: amount_of_blood / 2,
            }
          })
        )
        setTopHospitals({
          title: 'Hospital we supply the most blood units',
          unit: 'Orders (Litters)',
        })
      })
      .catch((err) => console.error(err.message))
  }, [])

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabNumber(newValue)
  }

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  return (
    <Box pt={1}>
      <Box
        sx={{ borderBottom: 1, borderColor: 'divider' }}
        alignItems={'center'}
      >
        <Tabs
          value={tabNumber}
          onChange={handleTabChange}
          aria-label="champions tabs"
          centered
        >
          <Tab label="Top Donors" {...a11yProps(0)} />
          <Tab label="Top Receptionists" {...a11yProps(1)} />
          <Tab label="Top Hospitals" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={tabNumber} index={0}>
        <TopTensTable displayData={topDonors} tableData={tableData} />
      </TabPanel>
      <TabPanel value={tabNumber} index={1}>
        <TopTensTable displayData={topReceptionists} tableData={tableData} />
      </TabPanel>
      <TabPanel value={tabNumber} index={2}>
        <TopTensTable displayData={topHospitals} tableData={tableData} />
      </TabPanel>
    </Box>
  )
}

export default Champions
