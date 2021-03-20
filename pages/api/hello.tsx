export default async (req, res) => {
  return (await (await fetch(`https://schoolmenukr.ml/api/middle/B100002273?year=2021&month=3&date=19`, {
    method: 'GET',
  })).json())
}