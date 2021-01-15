import React from 'react'

export function PackagePreview({ pack }) {
    return (
        <>
        <div>Package Preview</div>
        </>
    )
}


{/* <div key={idx} className={`${todo.isDone && 'todo-done'} flex space-between`} onInput={(ev) => { onNoteChosen(ev, idx) }}>
                    <p contentEditable suppressContentEditableWarning={true}>{todo.text}</p>
                    <img className={`${!todo.isDone && 'my-active'} pointer`} onClick={() => { onTodoDone(idx) }} src="apps/Keep/assets/img/V.png" />
                </div> */}



                // onUpdateNote = (ev, noteId, todoIdx) => {
                //     if (!ev) return
                //     const text = ev.target.innerText
                //     noteService.getNoteById(noteId)
                //         .then(noteToEdit => {
                //             switch (noteToEdit.type) {
                //                 case 'noteText':
                //                     noteToEdit.info.text = text;
                //                     noteService.save(noteToEdit)
                //                     break
                //                 case 'noteTodos':
                //                     noteToEdit.info.todos[todoIdx].text = text;
                //                     noteService.save(noteToEdit)
                //                     break;
                //                 case 'noteImg':
                //                 case 'noteVideo':
                //                     noteToEdit.info.title = text;
                //                     noteService.save(noteToEdit)
                //             }
                //         })
                // }
