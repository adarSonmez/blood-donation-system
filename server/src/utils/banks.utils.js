const bloodTypes = ['0-', '0+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+']

function completeMissingBloodTypes(arr) {
  const simplifiedArr = arr.map((b) => b.blood_type)

  bloodTypes.forEach((e) => {
    if (simplifiedArr.indexOf(e) == -1)
      arr.push({ blood_type: e, num_of_blood: 0 })
  })

  return arr
}

module.exports = { completeMissingBloodTypes }
