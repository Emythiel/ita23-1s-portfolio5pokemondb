const mainSectionElements = document.querySelectorAll('.main-section');
const buttonHeaderElements = document.querySelectorAll('.main-section-button');

/*
    Section slide animation functionality
 */
let currentSection = 0;
const mainSectionsCount = mainSectionElements.length;
function changeSection(targetSection) {
    const nextSection = (targetSection + mainSectionsCount) % mainSectionsCount;

    mainSectionElements.forEach((section, index) => {
        if (index === nextSection) {
            section.style.transform = 'translateX(0)';
            section.style.opacity = '1';
        } else {
            section.style.transform = `translateX(${(index - nextSection) * 100}%)`;
            section.style.opacity = '0';
        }
    });

    currentSection = nextSection;
}

buttonHeaderElements.forEach((button, index) => {
    button.addEventListener('click', function () {
        changeSection(index);
    });
});

changeSection(0);

/*
    Add loader and connection error base template and functions
 */
const loader = document.createElement('div');
loader.classList.add('loader', 'hidden');
const databaseError = document.createElement('p');
databaseError.textContent = "Unable to connect to Database";
databaseError.classList.add('database-error', 'hidden');

function displayLoader(visibility, section) {
    section.appendChild(loader);
    if (visibility) {
        loader.classList.remove('hidden');
    } else {
        loader.classList.add('hidden');
    }
}
function displayConnectionError(visibility, section) {
    section.appendChild(databaseError);
    if (visibility) {
        databaseError.classList.remove('hidden');
    } else {
        databaseError.classList.add('hidden');
    }
}
