// Profile Section Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling untuk menu dropdown
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animasi fade-in saat scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Tambahkan class fade-in ke semua section profil
    document.querySelectorAll('#profil section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Hover effect untuk cards
    document.querySelectorAll('.card.shadow').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Dropdown menu hover effect
    const dropdownMenus = document.querySelectorAll('.dropdown');
    dropdownMenus.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            if (window.innerWidth >= 992) { // Only on desktop
                this.querySelector('.dropdown-menu').classList.add('show');
            }
        });
        
        dropdown.addEventListener('mouseleave', function() {
            if (window.innerWidth >= 992) { // Only on desktop
                this.querySelector('.dropdown-menu').classList.remove('show');
            }
        });
    });

    // Active state untuk dropdown items
    function setActiveDropdownItem() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('.dropdown-item').forEach(item => {
            const targetId = item.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const targetPosition = targetElement.offsetTop - 150;
                const targetHeight = targetElement.offsetHeight;
                
                if (scrollPosition >= targetPosition && scrollPosition < (targetPosition + targetHeight)) {
                    document.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                }
            }
        });
    }

    // Update active state on scroll
    window.addEventListener('scroll', setActiveDropdownItem);
    
    // Set initial active state
    setActiveDropdownItem();
}); 