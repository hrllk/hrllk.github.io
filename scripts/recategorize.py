#!/usr/bin/env python3
"""
Re-categorize all blog posts based on the 14 main-task categories defined in
.taskmaster/tasks/tasks.json.

Categories: design, network, security, database, java, persistence,
            os, infrastructure, test, performance, algorithm, concurrency,
            tools, troubleshooting
"""
import os
import re
import sys
from pathlib import Path

# Mapping: filename -> new category
MAPPING = {
    # Java language / Spring framework / JVM ecosystem
    "2021-01-23-why-we-use-interface.md": "java",
    "2022-01-12-tryCatch-vs-ThrowsException.md": "java",
    "2022-05-25-ResponseBody-ModelAttribute.md": "java",
    "2022-06-07-ResponseEntity.md": "java",
    "2022-07-09-RequiredArgsConstructor.md": "java",
    "2022-07-18-DispatcherSevlet.md": "java",
    "2022-07-18-Drive-Order-Of-Spring.md": "java",
    "2022-07-18-web.xml.md": "java",
    "2023-02-06-why-we-use-spring.md": "java",
    "2023-02-07-pojo.md": "java",
    "2023-02-20-message-to-byte-encoder.md": "java",
    "2023-07-16-serialVerionUID.md": "java",
    "2024-03-20-non-blocking-http-request.md": "java",
    "2024-03-22-generic-response.md": "java",
    "2024-03-25-exception-handler.md": "java",
    "2024-05-07-diffrence-between-XSSFWorkbook-and-SXSSFWorkbook.md": "java",
    "2024-05-14-principle-of-operation-of-message-converter.md": "java",
    "2024-05-16-log-aspect.md": "java",
    "2024-07-02-job-store.md": "java",
    "2024-07-19-feign-void-async.md": "java",
    "2024-09-04-websocket-getting-started.md": "java",
    "2025-01-11-Checked_UnChecked.md": "java",
    "2025-01-14-diffrence-between-valid-validate.md": "java",
    "2025-01-14-java-standard-bean-validation-api.md": "java",
    "2025-03-02-jsession-id.md": "java",
    "2025-05-01-equals-hashCode.md": "java",
    "2025-05-09-try-with-resources.md": "java",
    "2025-05-26-generic.md": "java",
    "2025-06-15-Implementations-of-Map.md": "java",
    "2025-07-31-ApplicationEventPublisher.md": "java",
    "2026-02-18-java-object-memory-lifecycle.md": "java",
    "2026-02-19-gc-mark-and-sweep-basics.md": "java",
    "2026-02-19-jvm-memory-map-5min.md": "java",
    "2026-02-23-jvm-old-generation.md": "java",
    "2026-02-23-jvm-young-generation.md": "java",

    # Persistence (transaction / ORM / repository / connection pool)
    "2022-01-08-ORM-And-SqlMapper.md": "persistence",
    "2022-05-06-Transaction.md": "persistence",
    "2023-01-12-Connection-Pool.md": "persistence",
    "2023-07-21-log4jdbc.md": "persistence",
    "2024-03-27-JTA.md": "persistence",
    "2024-04-17-spring-transaction-strategy.md": "persistence",
    "2024-05-17-jpql.md": "persistence",
    "2025-09-04-EventListner.md": "persistence",
    "2025-09-05-Reliable-Auditing-for-Failed-Transactions.md": "persistence",
    "2026-04-17-application-data-access-design-prologue.md": "persistence",

    # Database (normalization / isolation level / RDB internals)
    "2021-02-06-mariaDB-Grant.md": "database",
    "2024-02-13-cs-note2.md": "database",
    "2025-06-11-READ_UNCOMMITTED.md": "database",
    "2025-06-12-transaction-isolation-levels.md": "database",

    # Network (TCP/IP, HTTP, NAT, VPN, subnet, L7 LB, switching)
    "2022-01-24-CORS.md": "network",
    "2022-01-25-what-diff-put-and-patch.md": "network",
    "2023-01-17-tcpdump.md": "network",
    "2023-02-17-http.md": "network",
    "2023-02-17-what-is-difference-http-https.md": "network",
    "2023-06-22-layer-7-load-balancing.md": "network",
    "2024-01-20-what-is-dhcp.md": "network",
    "2024-02-02-ICMP.md": "network",
    "2024-02-08-subnetmask.md": "network",
    "2025-02-15-ddns.md": "network",
    "2025-02-21-external.md": "network",
    "2025-02-21-switching-hub.md": "network",
    "2025-03-19-RARP.md": "network",
    "2025-03-25-CNAME.md": "network",
    "2025-03-25-Subnet.md": "network",
    "2025-04-08-VPN.md": "network",
    "2025-04-24-TCPIP.md": "network",
    "2025-04-24-packet-flow.md": "network",

    # Security (TLS/mTLS, certs, hashing, CSRF, CWE/CVE, scanning)
    "2022-02-08-base64.md": "security",
    "2022-06-02-what-is-pem.md": "security",
    "2023-07-17-nmap.md": "security",
    "2024-03-18-csrf.md": "security",
    "2024-10-15-TPS-note.md": "security",
    "2025-04-13-PKCS12.md": "security",
    "2025-04-13-mTLS.md": "security",
    "2025-05-01-X509TrustManager.md": "security",
    "2025-07-09-cs-note.md": "security",
    "2026-03-10-mTLS-mechanism-with-envoy.md": "security",

    # OS (kernel / memory / process / scheduling / linux)
    "2022-01-12-bashrc.md": "os",
    "2024-02-02-bestfit.md": "os",
    "2024-02-14-cs-note.md": "os",
    "2024-02-16-cs-note-lnx.md": "os",
    "2024-08-07-linux.md": "os",
    "2024-08-24-linux.md": "os",
    "2024-10-17-language-c-quiz.md": "os",

    # Concurrency (multi-thread / locks / synchronization / anomalies)
    "2023-04-13-MultiThread.md": "concurrency",
    "2023-04-13-ThreadSafe.md": "concurrency",
    "2023-04-29-Synchronized.md": "concurrency",
    "2025-01-11-ThreadLocal.md": "concurrency",
    "2025-02-22-thread-safe-quick-start.md": "concurrency",
    "2025-06-12-anomalies-of-concurrency.md": "concurrency",

    # Algorithm / data structure
    "2022-05-24-Algorithm-회의실.md": "algorithm",
    "2023-04-29-Stack.md": "algorithm",
    "2024-02-14-cs-note2.md": "algorithm",
    "2025-06-27-ArrayDeque.md": "algorithm",

    # Test (TDD / Mockito / testing strategies)
    "2022-12-16-Mockito.md": "test",
    "2024-02-17-cs-note.md": "test",
    "2025-06-17-Mockist-TDD.md": "test",

    # Performance (caching / profiling / tuning)
    "2024-03-26-caching-getting-started-on-spring.md": "performance",
    "2024-03-27-@transaction.md": "performance",
    "2024-03-27-caching-getting-started-on-spring.md": "performance",

    # Infrastructure (k8s / docker / cloud / mesh / monitoring)
    "2021-02-03-why-we-need-set-env.md": "infrastructure",
    "2022-05-06-devOps.md": "infrastructure",
    "2022-06-07-SES-Bounce.md": "infrastructure",
    "2023-02-27-docker.md": "infrastructure",
    "2023-06-10-kubernetes.md": "infrastructure",
    "2023-06-12-helm-chart-install-guide.md": "infrastructure",
    "2023-06-12-kubeneties-cli.md": "infrastructure",
    "2023-06-12-what-is-helm.md": "infrastructure",
    "2023-06-13-persistent-volume.md": "infrastructure",
    "2023-06-13-storage-class.md": "infrastructure",
    "2023-06-22-haproxy.md": "infrastructure",
    "2023-06-23-k8s-service-account.md": "infrastructure",
    "2023-06-26-containerd.md": "infrastructure",
    "2023-06-26-ctr-containerd-cli.md": "infrastructure",
    "2023-06-26-kubelet.md": "infrastructure",
    "2023-06-27-docker-command.md": "infrastructure",
    "2023-06-27-k8s-component-control-plain.md": "infrastructure",
    "2023-06-27-openshift.md": "infrastructure",
    "2023-07-08-nas.md": "infrastructure",
    "2023-07-09-openstack.md": "infrastructure",
    "2023-07-11-harbor.md": "infrastructure",
    "2024-05-08-spring-cloud-quick-start.md": "infrastructure",
    "2024-08-10-msa-architecture.md": "infrastructure",
    "2024-09-04-spring-cloud-config.md": "infrastructure",
    "2025-01-14-ArgoCD-getting-started.md": "infrastructure",
    "2025-01-18-docker-installation-on-silmac.md": "infrastructure",
    "2025-01-18-getting-started-docker-on-arm.md": "infrastructure",
    "2025-03-19-RAID.md": "infrastructure",
    "2026-02-12-prometheus-pull-vs-push.md": "infrastructure",
    "2026-02-12-time-series-and-sampling-basics.md": "infrastructure",
    "2026-02-13-spring-boot-prometheus-dependency.md": "infrastructure",
    "2026-03-05-istio-mesh-internal-443-series-overview.md": "infrastructure",
    "2026-03-06-why-should-use-mesh.md": "infrastructure",
    "2026-03-07-envoy-how-to-intercept.md": "infrastructure",
    "2026-03-09-envoy-protocol-boxing-unboxing.md": "infrastructure",

    # Tools (git / IDE / build tools / CLI / AI dev tools)
    "2023-01-19-pull-request.md": "tools",
    "2023-05-16-tmux.md": "tools",
    "2023-06-21-scm-manager.md": "tools",
    "2023-07-10-git-flow.md": "tools",
    "2023-07-10-show-diff-flow-github-gitlab.md": "tools",
    "2023-07-11-nexus.md": "tools",
    "2023-07-13-git-hook.md": "tools",
    "2023-07-17-neovim.md": "tools",
    "2023-07-18-gitlab-api-merge-request.md": "tools",
    "2023-07-19-maven-vs-gradle.md": "tools",
    "2025-07-03-getting-started-taskMatser.md": "tools",
    "2025-07-31-useful-gemini-cli.md": "tools",
    "2025-09-16-bare-repository.md": "tools",
    "2025-10-22-what-happen-bare-pull.md": "tools",
    "2025-10-28-what-happen-bare-push.md": "tools",
    "2025-11-11-Git-Pull-Event-Adverties-Refs-Deep-Dive.md": "tools",
    "2025-11-11-Git-Pull-Event-Trace.md": "tools",
    "2025-11-13-Git-Pull-Event-Negotiation-Deep-Dive.md": "tools",
    "2025-11-18-Git-Pull-Event-Packfile-Retrieval-Deep-Dive.md": "tools",
    "2026-03-13-when-should-switch-working-clone-to-bare-clone.md": "tools",

    # Troubleshooting (incident / debugging postmortems)
    "2021-12-19-FileNotFoundException.md": "troubleshooting",
    "2021-12-21-String.valueOf.md": "troubleshooting",
    "2022-03-15-you-do-not-have-the-SUPER-privilege.md": "troubleshooting",
    "2022-04-14-uncaught-syntax-error-unexpected-token.md": "troubleshooting",
    "2022-05-02-No-space-left-on-device.md": "troubleshooting",
    "2022-06-07-Circular-Reference.md": "troubleshooting",
    "2023-03-21-LocalDateTime_not_supported_by_default.md": "troubleshooting",
    "2023-09-28-maven-shade-plugin.md": "troubleshooting",
    "2024-03-04-trouble-shooting-get-inputstream-has-already-been-called.md": "troubleshooting",
    "2024-04-16-message-converter.md": "troubleshooting",
    "2024-04-22-POI-issue.md": "troubleshooting",
    "2025-03-23-0.0.0.0-vs-127-0-0-1.md": "troubleshooting",
    "2025-05-30-how-to-use-patch-in-feign.md": "troubleshooting",

    # Design (architecture / domain modeling / patterns / system design)
    "2021-02-01-mvc-pattern.md": "design",
    "2022-01-19-OOP-PP.md": "design",
    "2022-05-03-singletone.md": "design",
    "2023-02-21-factory-pattern.md": "design",
    "2024-02-13-cs-note.md": "design",
    "2024-03-08-hexagonal-architecture.md": "design",
    "2024-06-24-cs-note.md": "design",
    "2024-07-22-cs-note.md": "design",
    "2024-07-23-cs-note.md": "design",
    "2024-12-07-event-storming.md": "design",
    "2025-03-31-RAG.md": "design",
    "2025-04-17-cs-note.md": "design",
    "2025-06-24-Nullish-Falsy.md": "design",
    "2025-07-01-Layerd-Architecture.md": "design",
    "2025-07-01-custom-exception-ko.md": "design",
    "2025-07-01-custom-exception.md": "design",
    "2025-07-07-getting-started-avro.md": "design",
    "2025-07-25-design.md": "design",
    "2025-08-07-annotations.md": "design",
    "2025-08-25-NDJSON.md": "design",
    "2025-09-02-saga-pattern.md": "design",
    "2025-09-08-ddd-rules.md": "design",
    "2026-02-12-cs-map-for-backend.md": "design",
    "2026-03-14-hexagonal-architecture.md": "design",
    "2026-03-15-modern-beautiful-api-response-design-prologue.md": "design",
    "2026-03-16-modern-beautiful-api-response-design-internal-exception-model.md": "design",
    "2026-03-17-modern-beautiful-api-response-design-external-error-contract.md": "design",
    "2026-03-18-modern-beautiful-api-response-design-exception-translation-layer.md": "design",
    "2026-03-19-modern-beautiful-api-response-design-exception-scaffolding-draft.md": "design",
    "2026-03-21-modern-java-domain-modeling-prologue.md": "design",
    "2026-03-23-modern-java-domain-modeling-entity-vs-value-object.md": "design",
    "2026-03-25-modern-java-domain-modeling-aggregate-boundary.md": "design",
    "2026-04-19-transactional-outbox-in-practice-prologue.md": "design",
    "2026-04-21-transactional-outbox-in-practice-atomic-persist-and-enqueue.md": "design",
    "2026-04-23-transactional-outbox-in-practice-thin-poller-and-at-least-once.md": "design",
    "2026-04-25-transactional-outbox-in-practice-idempotent-consumer.md": "design",
    "2026-04-27-transactional-outbox-in-practice-operating-in-production.md": "design",
}

# Theme demo/example posts that should NOT be re-categorized
SKIP_FILES = {
    "2020-07-06-strange-post.md",
    "2020-07-07-overview-post.md",
    "2020-07-08-language-tests.md",
    "2020-07-08-very-very-very-long-title-and-very-very-very-short-content.md",
    "2020-07-09-post-example-with-headings-and-toc.md",
    "2020-07-09-post-example-with-hr.md",
    "2023-02-03-jektex-post.md",
    "2023-02-17-algorithm-sample.md",
    "2023-02-17-dataStructure-sample.md",
    "2023-02-17-network-sample.md",
}


FRONTMATTER_RE = re.compile(r"^---\n(.*?)\n---\n", re.DOTALL)
CATEGORY_LINE_RE = re.compile(r"^categor(?:y|ies):.*$\n?", re.MULTILINE)


def update_post(path: Path, new_category: str) -> str:
    text = path.read_text(encoding="utf-8")
    m = FRONTMATTER_RE.match(text)
    if not m:
        return "no-frontmatter"

    fm_body = m.group(1)
    fm_body_new = CATEGORY_LINE_RE.sub("", fm_body).rstrip()
    fm_body_new += f"\ncategory: {new_category}"

    new_text = f"---\n{fm_body_new}\n---\n" + text[m.end():]
    if new_text == text:
        return "unchanged"
    path.write_text(new_text, encoding="utf-8")
    return "updated"


def main() -> int:
    posts = Path("_posts")
    if not posts.is_dir():
        print(f"_posts directory not found at {posts.resolve()}", file=sys.stderr)
        return 1

    seen = set()
    updated = 0
    unchanged = 0
    skipped = 0
    missing_mapping = []

    for path in sorted(posts.glob("*.md")):
        seen.add(path.name)
        if path.name in SKIP_FILES:
            skipped += 1
            continue
        new_cat = MAPPING.get(path.name)
        if new_cat is None:
            missing_mapping.append(path.name)
            continue
        status = update_post(path, new_cat)
        if status == "updated":
            updated += 1
        else:
            unchanged += 1

    extras = set(MAPPING.keys()) - seen
    print(f"updated:   {updated}")
    print(f"unchanged: {unchanged}")
    print(f"skipped:   {skipped}")
    if missing_mapping:
        print("\nFiles without mapping:")
        for f in missing_mapping:
            print(f"  - {f}")
    if extras:
        print("\nMapping entries with no matching file:")
        for f in sorted(extras):
            print(f"  - {f}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
