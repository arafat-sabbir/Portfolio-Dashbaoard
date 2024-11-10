"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";

const CustomBreadcrumb = () => {
  const pathName = usePathname();
  const pathSegments = pathName.split("/").filter(Boolean); // Split the pathname into segments and remove empty segments

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathSegments.map((segment, index) => {
          // Build the path for each segment
          const path = `/${pathSegments.slice(0, index + 1).join("/")}`;

          // If it's the second-to-last item, make it point to the final path instead
          const isSecondToLast = index === pathSegments.length - 2;
          const isLast = index === pathSegments.length - 1;

          return (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="capitalize">
                    {segment.replace(/-/g, " ")}
                  </BreadcrumbPage> // Replace hyphens with spaces for readability
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      className="capitalize"
                      href={
                        isSecondToLast ? `/${pathSegments.join("/")}` : path
                      }
                    >
                      {segment.replace(/-/g, " ")}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
