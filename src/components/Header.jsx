export default function Header() {
  return (
    <div className="h-[4em] flex items-center justify-end pr-8">
      <div className="flex items-baseline gap-4">
        <span className="material-symbols-outlined text-xl">notifications</span>
        <img
          className="rounded w-8 h-8 object-cover"
          src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
          alt="image description"
        />
      </div>
    </div>
  );
}
