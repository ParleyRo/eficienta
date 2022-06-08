export default function ItemLoading(props) {
  return (
    <span className={`itemLoading ${props?.data?.color ? props.data.color : ''}`}><span></span><span></span><span></span><span></span></span>
  )
}
