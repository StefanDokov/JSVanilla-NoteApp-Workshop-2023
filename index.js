const btnEl = document.getElementById('btn');
const appEl = document.getElementById('app');


getNotes().forEach((note) => {
    const noteEl = createNoteEl(note.id, note.content);
    appEl.insertBefore(noteEl, btnEl);
});

function createNoteEl(id, content) {
     const element = document.createElement('textarea');
     element.classList.add('note');
     element.placeholder = 'Empty note';
     element.value = content;
     element.addEventListener('dblclick', (e) => {
       const warning = confirm('Do you want to delete this note?');
       if (warning) {
         deleteNote(id, element);
       }
     });

     element.addEventListener('input', () => {
        updateNote(id, element.value);
     });

     return element;
}

function deleteNote(id, element) {
    const items = getNotes();
    const allEls = items.filter((note) => note.id != id);
    saveNote(allEls);
    appEl.removeChild(element);
}

function updateNote(id, value){
    const items = getNotes();
    const target = items.filter((note) => note.id == id)[0];
    target.content = value;
    saveNote(items);
}

function addNote() {
    const notes = getNotes();
    const noteObj = {
        id: Math.floor(Math.random() * 100000),
        content: "",
    }
    const noteEl = createNoteEl(noteObj.id, noteObj.content);
    appEl.insertBefore(noteEl, btnEl);
    notes.push(noteObj);

    saveNote(notes);

}
function saveNote(notes) {
     localStorage.setItem('note-app', JSON.stringify(notes));
}

function getNotes() {
    return JSON.parse(localStorage.getItem('note-app') || "[]");
   
}


btnEl.addEventListener('click', addNote);


