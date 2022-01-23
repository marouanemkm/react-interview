import '../css/Filter.css'

const Filter = ({array, setFilter}) => {
    return (
        <select className='select' name="categories" id="categories-select" onChange={e => setFilter(e.target.value)}>
            <option selected='selected' value="">Toutes les catégories</option>
            {
                array.map((item, index) => (
                    <option value={item} key={index}>{item}</option>
                ))
            }
        </select>
    )
}

export default Filter