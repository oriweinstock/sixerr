import React from 'react'

export function PackagePreview({ pack }) {
    console.log("PackagePreview , package", pack)
    return (
        <>
            <tbody>
                <tr >
                    <th>Package</th>
                    <td>
                        <p>${pack.price}</p>
                        <p>{pack.type}</p>
                        <p>${pack.price} STARTER</p>
                    </td>
                </tr>
            </tbody>
        </>
    )
}


{/* <div key={idx} className={`${todo.isDone && 'todo-done'} flex space-between`} onInput={(ev) => { onNoteChosen(ev, idx) }}>
                    <p contentEditable suppressContentEditableWarning={true}>{todo.text}</p>
                    <img className={`${!todo.isDone && 'my-active'} pointer`} onClick={() => { onTodoDone(idx) }} src="apps/Keep/assets/img/V.png" />
                </div> */}
