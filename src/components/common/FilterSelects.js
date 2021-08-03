// export function FilterByGenreSelect({ genres, handleChange }) {
//   return (
//     <>
//       <label>Genre: </label>
//       <select default="0" onChange={handleChange}>
//         <option value="0">All</option>
//         {genres && genres.map(genre => (
//           <option key={genre.name} value={genre.id}>{genre.name}</option>
//         ))}
//       </select>
//     </>
//   )
// }

// export function FilterByReleaseTypeSelect({ handleChange }) {
//   return (
//     <>
//       <label>Release Type: </label>
//       <select default="0" onChange={handleChange}>
//         <option value="All">All</option>
//         <option value="Album">Albums</option>
//         <option value="EP">EPs</option>
//         <option value="Single">Singles</option>
//       </select>
//     </>
//   )
// }

export function FilterSelect({ label, defaultOption, options, handleChange }) {
  return (
    <div
      className="filter"
    >
      <label>{label}: </label>
      <select default={defaultOption} onChange={handleChange}>
        <option value={defaultOption}>All</option>
        {options && options.map(option => (
          <option 
            key={option.name || option} 
            value={option.id || option}
          >
            {option.name || option}
          </option>
        ))}
      </select>
    </div>
  )
}