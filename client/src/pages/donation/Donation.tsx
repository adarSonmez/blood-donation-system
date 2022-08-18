import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bank, getBanks } from '../../api/banks.api'
import { checkDonor, postDonation } from '../../api/donations.api'
import { BloodType } from '../../components/blood-types-table/BloodTypesTable'
import { UserContext } from '../../contexts/user.context'
import bloodTypes from '../../data/bloodTypes'

function Donation() {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  const [locked, setLocked] = useState(true)
  const [searched, setSearched] = useState(false)
  const [banks, setBanks] = useState<Bank[]>([])
  const [form1, setFrom1] = useState({ donor_id: 0 })
  const [form2, setForm2] = useState({
    name: '',
    blood_type: '0-' as BloodType,
    bank_id: 1,
  })

  useEffect(() => {
    getBanks()
      .then((r) => {
        setBanks(r.data.filter((bank) => bank.size < bank.capacity))
      })
      .catch((err) => console.error(err))
  }, [])

  const handleChange = (event: ChangeEvent, formNo: number) => {
    const element = event.target as HTMLInputElement
    let name = element.name
    let value = element.value

    if (formNo === 1) {
      setSearched(false)
      setFrom1({ ...form1, [name]: value })
    } else if (formNo === 2) setForm2({ ...form2, [name]: value })
  }

  const searchSSN = (event: FormEvent) => {
    event.preventDefault()
    setSearched(true)

    checkDonor(form1.donor_id).then((r) => {
      if (!r.data.donor) {
        alert(
          `Donor with id ${form1.donor_id} is not registered. Please enter donor information.`
        )
        setForm2({ name: '', blood_type: '0-', bank_id: 1 })
        setLocked(false)
      } else {
        setLocked(true)
        setForm2({
          ...form2,
          name: r.data.donor.name,
          blood_type: r.data.donor.blood_type,
        })
      }
    })
  }

  const donateBlood = (event: FormEvent) => {
    event.preventDefault()

    if (!searched)
      alert(
        "Please enter the user's SSN first and then click the search button!"
      )
    else
      postDonation({ ...form2, ...form1, recep_id: user.id })
        .then(() => {
          alert('Successfully donated!')
          navigate('/')
        })
        .catch((err) => console.error(err.message))
  }

  return (
    <main className="donation-page">
      <form className="check-donor-form" onSubmit={searchSSN}>
        <input
          type="text"
          maxLength={11}
          minLength={11}
          name="donor_id"
          placeholder="Enter SSN of donor"
          value={form1.donor_id}
          onChange={(e) => handleChange(e, 1)}
          required
        />
        <button type="submit">Search</button>
      </form>

      <form className="donate-blood-form" onSubmit={donateBlood}>
        <label htmlFor="ssn">SSN: </label>
        <input
          type="text"
          maxLength={11}
          minLength={11}
          name="donor_id"
          placeholder="Enter SSN of donor"
          value={form1.donor_id}
          disabled={true}
          required
          id="ssn"
        />

        <label htmlFor="full-name">Full Name: </label>
        <input
          type="text"
          name="name"
          placeholder="Enter full name of donor"
          value={form2.name}
          onChange={(e) => handleChange(e, 2)}
          disabled={locked}
          required
          id="full-name"
        />

        <label htmlFor="blood-type">Blood Type: </label>
        <select
          name="blood_type"
          value={form2.blood_type}
          onChange={(e) => handleChange(e, 2)}
          disabled={locked}
          id="blood_type"
          required
        >
          {bloodTypes.map(({ type }) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <label htmlFor="bank-address">Bank Address: </label>
        <select
          name="bank_id"
          value={form2.bank_id}
          onChange={(e) => handleChange(e, 2)}
          required
          id="bank-address"
        >
          {banks.map(({ bank_id, address }) => (
            <option key={bank_id} value={bank_id}>
              {address}
            </option>
          ))}
        </select>

        <button className="donate-btn" type="submit">
          Donate (500ml)
        </button>
      </form>
    </main>
  )
}

export default Donation
