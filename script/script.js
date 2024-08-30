const DEFAULT_PHOTO_URL =
	'https://www.litres.ru/static/authors/100/15/86/49/15864910.jpg'

let users = [
	{
		id: 1,
		firstName: 'Иван',
		lastName: 'Иванов',
		age: 18,
		email: 'ivanov@example.com',
		photo: DEFAULT_PHOTO_URL,
	},
	{
		id: 2,
		firstName: 'Петр',
		lastName: 'Петров',
		age: 25,
		email: 'petrov@example.com',
		photo: null,
	},
	{
		id: 3,
		firstName: 'Анна',
		lastName: 'Сидорова',
		age: 30,
		email: 'sidorova@example.com',
		photo: null,
	},
	{
		id: 4,
		firstName: 'Мария',
		lastName: 'Кузнецова',
		age: 22,
		email: 'kuznetsova@example.com',
		photo: null,
	},
	{
		id: 5,
		firstName: 'Алексей',
		lastName: 'Смирнов',
		age: 28,
		email: 'smirnov@example.com',
		photo: null,
	},
	{
		id: 6,
		firstName: 'Елена',
		lastName: 'Попова',
		age: 35,
		email: 'popova@example.com',
		photo: null,
	},
	{
		id: 7,
		firstName: 'Сергей',
		lastName: 'Васильев',
		age: 19,
		email: 'vasiliev@example.com',
		photo: DEFAULT_PHOTO_URL,
	},
	{
		id: 8,
		firstName: 'Ольга',
		lastName: 'Новикова',
		age: 45,
		email: 'novikova@example.com',
		photo: null,
	},
	{
		id: 9,
		firstName: 'Дмитрий',
		lastName: 'Морозов',
		age: 33,
		email: 'morozov@example.com',
		photo: null,
	},
	{
		id: 10,
		firstName: 'Татьяна',
		lastName: 'Соколова',
		age: 27,
		email: 'sokolova@example.com',
		photo: null,
	},
	{
		id: 11,
		firstName: 'Михаил',
		lastName: 'Зайцев',
		age: 23,
		email: 'zaitsev@example.com',
		photo: null,
	},
	{
		id: 12,
		firstName: 'Юлия',
		lastName: 'Семенова',
		age: 41,
		email: 'semenova@example.com',
		photo: DEFAULT_PHOTO_URL,
	},
	{
		id: 13,
		firstName: 'Георгий',
		lastName: 'Волков',
		age: 26,
		email: 'volkov@example.com',
		photo: null,
	},
]

function displayUsers(userList) {
	const userContainer = document.querySelector('.page__list')
	userContainer.innerHTML = ''

	if (userList.length === 0) {
		const noUsersMessage = document.createElement('p')
		noUsersMessage.className = 'no-users-message'
		noUsersMessage.textContent = 'Ничего не найдено'
		userContainer.appendChild(noUsersMessage)
		return
	}

	userList.forEach(user => {
		const userItem = document.createElement('li')
		userItem.className = 'page__list-item'

		const userInfo = document.createElement('div')
		userInfo.className = 'item__text-wrapper'
		userInfo.innerHTML = `
      <p class="item__text">${user.lastName} ${user.firstName}</p>
      <p class="item__text">Возраст: ${user.age} лет</p>
      <p class="item__text">Почта: ${user.email}</p>
    `

		const addPhotoButton = document.createElement('button')
		addPhotoButton.className = 'page__button'
		addPhotoButton.textContent = 'Добавить фото'
		addPhotoButton.onclick = () => openModal(user.id)

		if (user.photo && user.photo !== DEFAULT_PHOTO_URL) {
			addPhotoButton.disabled = true
		}

		userInfo.appendChild(addPhotoButton)

		const imgWrapper = document.createElement('div')
		imgWrapper.className = 'item__img-wrapper'

		const userImg = document.createElement('img')
		userImg.className = 'item__img'
		userImg.src = user.photo ? user.photo : DEFAULT_PHOTO_URL
		userImg.alt = 'Аватар'

		imgWrapper.appendChild(userImg)

		userItem.appendChild(userInfo)
		userItem.appendChild(imgWrapper)
		userContainer.appendChild(userItem)
	})
}

function openModal(userId) {
	const modal = document.querySelector('.modal__container')
	modal.style.display = 'flex'

	modal.setAttribute('data-user-id', userId)
}

function closeModal() {
	const modal = document.querySelector('.modal__container')
	modal.style.display = 'none'
	modal.removeAttribute('data-user-id')
	document.getElementById('photo-url').value = ''
}

function addPhoto() {
	const modal = document.querySelector('.modal__container')
	const userId = modal.getAttribute('data-user-id')
	const photoUrlInput = document.getElementById('photo-url')
	const newPhotoUrl = photoUrlInput.value

	const user = users.find(user => user.id == userId)
	if (user) {
		user.photo = newPhotoUrl
	}

	closeModal()
	displayUsers(users)
}

function applyFilter() {
	const ageFilterStart = document.getElementById('age-filter-start').checked
	const ageFilterEnd = document.getElementById('age-filter-end').checked
	const ageValue = parseInt(
		document.querySelector('input[type="number"]').value
	)

	let filteredUsers = users

	if (ageFilterStart) {
		filteredUsers = users.filter(user => user.age < ageValue)
	} else if (ageFilterEnd) {
		filteredUsers = users.filter(user => user.age > ageValue)
	} else if (!isNaN(ageValue)) {
		filteredUsers = users.filter(user => user.age === ageValue)
	}

	displayUsers(filteredUsers)
}

function sortUsers() {
	const sortBy = document.getElementById('sort-by').value

	users.sort((a, b) => {
		if (sortBy === 'name') {
			return a.firstName.localeCompare(b.firstName)
		} else if (sortBy === 'age') {
			return a.age - b.age
		}
	})

	displayUsers(users)
}

document.querySelector('.modal__container').addEventListener('click', event => {
	if (event.target.classList.contains('modal__container')) {
		closeModal()
	}
})

document.addEventListener('DOMContentLoaded', () => {
	displayUsers(users)
})
