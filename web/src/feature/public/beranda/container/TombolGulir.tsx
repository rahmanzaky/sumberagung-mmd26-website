'use client';

type TombolGulirProps = {
    targetId: string;
    className?: string;
    children: React.ReactNode;
};

/**
 * Tetap ditulis sebagai <a> agar berfungsi tanpa JavaScript,
 * tetapi penggulirannya ditangani langsung supaya tidak bergantung
 * pada perubahan URL — klik kedua dan seterusnya tetap bekerja.
 */
export default function TombolGulir({
    targetId,
    className,
    children,
}: TombolGulirProps) {
    function tangani(event: React.MouseEvent<HTMLAnchorElement>) {
        const target = document.getElementById(targetId);
        if (!target) return;

        event.preventDefault();

        const kurangiGerak = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;

        target.scrollIntoView({
            behavior: kurangiGerak ? 'auto' : 'smooth',
            block: 'start',
        });
    }

    return (
        <a href={`#${targetId}`} onClick={tangani} className={className}>
            {children}
        </a>
    );
}